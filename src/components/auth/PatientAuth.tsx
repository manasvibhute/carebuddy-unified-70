import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Fingerprint, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VoiceInput } from "../voice/VoiceInput";
import { VoiceButton } from "../voice/VoiceButton";
import { BiometricAuth } from "./BiometricAuth";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";

interface PatientAuthProps {
  onLogin: () => void;
  onBack: () => void;
}

export const PatientAuth = ({ onLogin, onBack }: PatientAuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const { toast } = useToast();
  const { isAvailable, getBiometryTypeName } = useBiometricAuth();

  useEffect(() => {
    // Check if we should show biometric auth for login
    if (isLogin && isAvailable) {
      setUseBiometric(true);
      setShowBiometric(true);
    }
  }, [isLogin, isAvailable]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isLogin ? "Login Successful" : "Account Created",
      description: isLogin ? "Welcome back!" : "Your account has been created successfully",
    });

    onLogin();
  };

  const handleBiometricSuccess = () => {
    toast({
      title: "Biometric Login Successful",
      description: "Welcome back!",
    });
    onLogin();
  };

  const handleBiometricFallback = () => {
    setUseBiometric(false);
    setShowBiometric(false);
  };

  const handleBiometricLogin = () => {
    setShowBiometric(true);
  };

  // Show biometric auth screen if available and requested
  if (showBiometric && isAvailable && useBiometric) {
    return (
      <BiometricAuth
        onSuccess={handleBiometricSuccess}
        onFallback={handleBiometricFallback}
        onCancel={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-medical-light-green p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <VoiceButton />
        </div>

        <Card className="p-6 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Patient {isLogin ? "Login" : "Signup"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Welcome back to your health portal" : "Join our healthcare platform"}
            </p>
          </div>

          {isLogin && isAvailable && !useBiometric && (
            <div className="mb-6">
              <Button
                onClick={handleBiometricLogin}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground mb-3"
              >
                <Fingerprint className="h-5 w-5 mr-2" />
                Login with {getBiometryTypeName()}
              </Button>
              <div className="text-center text-muted-foreground text-sm">or use manual login</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <VoiceInput
                value={name}
                onChange={setName}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <VoiceInput
                value={phone}
                onChange={setPhone}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <VoiceInput
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email address"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a secure password"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="pr-10"
                    />
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
              size="lg"
            >
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setUseBiometric(false);
                setShowBiometric(false);
              }}
              className="text-primary"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"
              }
            </Button>
          </div>

          {isLogin && (
            <div className="text-center mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="h-3 w-3" />
                Your biometric data is stored securely on your device
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};