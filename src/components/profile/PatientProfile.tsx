import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Calendar, LogOut } from "lucide-react";

export const PatientProfile = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card className="p-6 mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
            <p className="text-muted-foreground">Patient ID: #12345</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-foreground">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-foreground">john.doe@email.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-foreground">Born: Jan 15, 1990</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-4">
        <h3 className="font-semibold text-foreground mb-3">Medical Information</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Blood Type:</span>
            <span className="text-foreground">O+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height:</span>
            <span className="text-foreground">5'10"</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight:</span>
            <span className="text-foreground">165 lbs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Allergies:</span>
            <span className="text-foreground">Penicillin</span>
          </div>
        </div>
      </Card>

      <Button
        variant="outline"
        className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
};