import { useState } from 'react';
import { Fingerprint, Eye, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { useToast } from '@/hooks/use-toast';
import { BiometryType } from '@/utils/biometric-fallback';

interface BiometricAuthProps {
  onSuccess: () => void;
  onFallback: () => void;
  onCancel: () => void;
}

export const BiometricAuth = ({ onSuccess, onFallback, onCancel }: BiometricAuthProps) => {
  console.log("BiometricAuth rendered");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { isAvailable, biometryType, authenticate, getBiometryTypeName } = useBiometricAuth();
  const { toast } = useToast();

  const getBiometricIcon = () => {
    switch (biometryType) {
      case BiometryType.TOUCH_ID:
      case BiometryType.FINGERPRINT:
        return <Fingerprint className="h-16 w-16 text-primary" />;
      case BiometryType.FACE_ID:
      case BiometryType.FACE_AUTHENTICATION:
        return <Eye className="h-16 w-16 text-primary" />;
      case BiometryType.IRIS_AUTHENTICATION:
        return <Eye className="h-16 w-16 text-primary" />;
      default:
        return <Shield className="h-16 w-16 text-primary" />;
    }
  };

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    
    try {
      const result = await authenticate('Authenticate to access your healthcare account');
      
      if (result.success) {
        toast({
          title: 'Authentication Successful',
          description: 'Welcome back!',
        });
        onSuccess();
      } else {
        toast({
          title: 'Authentication Failed',
          description: result.error || 'Please try again or use manual login',
          variant: 'destructive',
        });
        
        if (result.fallback) {
          onFallback();
        }
      }
    } catch (error) {
      toast({
        title: 'Authentication Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      onFallback();
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!isAvailable) {
    onFallback();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-medical-light-green flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card shadow-lg">
        <div className="text-center space-y-6">
          <div style={{ color: 'red', fontWeight: 'bold' }}>BIOMETRIC AUTH UI RENDERED</div>
          <div className="flex justify-center">
            {getBiometricIcon()}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Secure Login
            </h1>
            <p className="text-muted-foreground">
              Use {getBiometryTypeName()} to access your account securely
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleBiometricAuth}
              disabled={isAuthenticating}
              size="lg"
              className="w-full"
            >
              {isAuthenticating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {getBiometricIcon()}
                  Authenticate with {getBiometryTypeName()}
                </div>
              )}
            </Button>

            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={onFallback}
                className="w-full"
                disabled={isAuthenticating}
              >
                <User className="h-4 w-4 mr-2" />
                Use Manual Login
              </Button>
              
              <Button
                variant="ghost"
                onClick={onCancel}
                className="w-full"
                disabled={isAuthenticating}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};