import { useState } from "react";
import { User, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";

interface PatientBiometricAuthProps {
  onSuccess: () => void;
  onFallback: () => void;
  onCancel: () => void;
}

export const PatientBiometricAuth = ({
  onSuccess,
  onFallback,
  onCancel,
}: PatientBiometricAuthProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate, isAvailable } = useBiometricAuth();
  const { toast } = useToast();

  const handleBiometricAuth = async () => {
    if (!name || !phone) {
      toast({
        title: "Missing Information",
        description: "Please enter both name and phone number",
        variant: "destructive",
      });
      return;
    }

    if (!isAvailable) {
      toast({
        title: "Biometric Not Available",
        description: "Falling back to manual login",
        variant: "destructive",
      });
      onFallback();
      return;
    }

    setIsAuthenticating(true);
    try {
      const result = await authenticate("Place your thumb on the scanner");

      if (result.success) {
        toast({
          title: "Authentication Successful",
          description: `Welcome ${name}!`,
        });
        onSuccess();
      } else {
        toast({
          title: "Authentication Failed",
          description: result.error || "Please try again or use manual login",
          variant: "destructive",
        });
        onFallback();
      }
    } catch (err) {
      toast({
        title: "Authentication Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      onFallback();
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-light-blue to-medical-light-green p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Patient Login</h1>
          <p className="text-center text-muted-foreground">
            Enter your details and authenticate with biometrics
          </p>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Patient Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="h-4 w-4" />}
            />
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Phone className="h-4 w-4" />}
            />
          </div>

          {/* Biometric Section */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            {/* 👇 Replace fingerprint icon with image */}
            <img
              src="/fingerprint.png"
              alt="Fingerprint Scanner"
              className="h-20 w-20 mx-auto"
            />

            <p className="text-sm font-medium">Place your thumb on the scanner</p>

            <Button
              onClick={handleBiometricAuth}
              disabled={isAuthenticating}
              className="w-full"
            >
              {isAuthenticating ? "Authenticating..." : "Authenticate with Fingerprint"}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={onFallback}
              disabled={isAuthenticating}
            >
              Use Manual Login
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={onCancel}
              disabled={isAuthenticating}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
