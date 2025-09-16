import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Fingerprint, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VoiceButton } from "../voice/VoiceButton";

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
  const [showFingerprintModal, setShowFingerprintModal] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowFingerprintModal(false);
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
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

  const handleFingerprintClick = () => {
    setShowFingerprintModal(true);
  };

  const handleFingerprintImageClick = () => {
    setShowFingerprintModal(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-primary/5 to-medical-light-blue p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <VoiceButton />
        </div>

        <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-0">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Patient {isLogin ? "Login" : "Signup"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Welcome back to your health portal" : "Join our healthcare platform"}
            </p>
          </div>

          {isLogin && (
            <div className="mb-6">
              <Button
                onClick={handleFingerprintClick}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl h-14 shadow-lg mb-3 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center gap-3">
                  <Fingerprint className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">Use Fingerprint</div>
                    <div className="text-xs opacity-90">Tap and place your finger</div>
                  </div>
                </div>
              </Button>
              <div className="flex items-center gap-2 justify-center text-muted-foreground text-sm">
                <div className="h-px bg-border flex-1"></div>
                <span>or use email & password</span>
                <div className="h-px bg-border flex-1"></div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
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
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </Button>
          </div>

          {isLogin && (
            <div className="text-center mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="h-3 w-3" />
                Your data is stored securely
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Fingerprint Modal */}
      {showFingerprintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.JOTrHx5SqMTIZpPyQ0ylOgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" // Replace with your image path
              alt="Fingerprint"
              className="rounded-full w-32 h-32 object-cover shadow-lg cursor-pointer border-4 border-primary"
              onClick={handleFingerprintImageClick}
            />
            <p className="mt-4 text-white text-lg font-semibold">Tap fingerprint to login</p>
          </div>
        </div>
      )}
    </div>
  );
};