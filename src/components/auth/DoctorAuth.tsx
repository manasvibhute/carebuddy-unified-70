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
    <div className="min-h-screen bg-background p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 p-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Doctor {isLogin ? "Login" : "Signup"}
            </h1>
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
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
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
                : "Already have an account? Login"
              }
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};