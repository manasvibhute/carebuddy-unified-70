import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DoctorAuthProps {
  onLogin: () => void;
  onBack: () => void;
}

export const DoctorAuth = ({ onLogin, onBack }: DoctorAuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [certificates, setCertificates] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCertificates(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      toast({
        title: "Account Under Review",
        description: "Your doctor account will be verified within 24-48 hours",
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back, Doctor",
      });
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-primary/5 to-medical-light-blue p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/20 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-0">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Doctor {isLogin ? "Login" : "Signup"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Welcome back to your practice portal" : "Join our healthcare network"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="license">Medical License Number</Label>
                  <Input
                    id="license"
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    placeholder="Enter your license number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="certificates">Upload Certificates/Proof</Label>
                  <div className="mt-2">
                    <input
                      id="certificates"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("certificates")?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {certificates.length > 0
                        ? `${certificates.length} file(s) selected`
                        : "Upload Documents"
                      }
                    </Button>
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl h-12"
            >
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          {!isLogin && (
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4 rounded-xl h-12 border-2"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Login with Google
              </Button>
            </div>
          )}

          <div className="text-center mt-4">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"
              }
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};