import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock } from "lucide-react";

interface HomePageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const HomePage = ({ onLogin, onSignup }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-medical-light-green p-4 flex flex-col">
      {/* Header */}
      <div className="text-center pt-12 pb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-12 w-12 text-medical-blue mr-2" />
          <h1 className="text-3xl font-bold text-medical-blue">HealthCare</h1>
        </div>
        <p className="text-xl text-foreground/80 font-medium">
          Your Health, Your Care, Anytime.
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 flex flex-col justify-center space-y-6 max-w-sm mx-auto w-full">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border-0">
            <Heart className="h-8 w-8 text-medical-blue mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground/80">Care</p>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border-0">
            <Shield className="h-8 w-8 text-medical-green mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground/80">Safe</p>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border-0">
            <Clock className="h-8 w-8 text-medical-blue mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground/80">24/7</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={onLogin}
            className="w-full h-14 text-lg font-semibold rounded-xl bg-medical-blue hover:bg-medical-blue/90"
          >
            Login
          </Button>
          <Button 
            onClick={onSignup}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-xl border-2 border-medical-blue text-medical-blue hover:bg-medical-blue/10"
          >
            Sign Up
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 pb-4">
        <p className="text-sm text-foreground/60">
          Connecting you with quality healthcare
        </p>
      </div>
    </div>
  );
};