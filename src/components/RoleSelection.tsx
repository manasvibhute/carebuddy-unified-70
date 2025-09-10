import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Stethoscope, ArrowLeft } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: "patient" | "doctor") => void;
  onBack: () => void;
}

export const RoleSelection = ({ onRoleSelect, onBack }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-medical-light-green p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold text-medical-blue">Select Your Role</h2>
        <div className="w-10" />
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-12 mt-8">
        <h1 className="text-2xl font-bold text-medical-blue mb-2">
          Welcome to HealthCare
        </h1>
        <p className="text-foreground/70 text-lg">Choose how you'll use the app</p>
      </div>

      {/* Role Cards */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-6 max-w-sm mx-auto w-full">
          <Card className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 hover:scale-105">
            <Button
              variant="ghost"
              className="w-full h-28 flex flex-col items-center justify-center space-y-3 text-center rounded-xl"
              onClick={() => onRoleSelect("patient")}
            >
              <div className="p-3 bg-medical-blue/10 rounded-full">
                <UserCheck className="h-10 w-10 text-medical-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-medical-blue">Patient</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  Book appointments and manage your health
                </p>
              </div>
            </Button>
          </Card>

          <Card className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 hover:scale-105">
            <Button
              variant="ghost"
              className="w-full h-28 flex flex-col items-center justify-center space-y-3 text-center rounded-xl"
              onClick={() => onRoleSelect("doctor")}
            >
              <div className="p-3 bg-medical-green/10 rounded-full">
                <Stethoscope className="h-10 w-10 text-medical-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-medical-green">Doctor</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  Manage patients and provide care
                </p>
              </div>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};