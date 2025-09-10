import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Award, LogOut } from "lucide-react";

export const DoctorProfile = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your professional account</p>
      </div>

      <Card className="p-6 mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Dr. Sarah Wilson</h2>
            <p className="text-muted-foreground">License: MD123456</p>
            <Badge variant="secondary" className="mt-1">Verified</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-foreground">s.wilson@hospital.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-foreground">+1 (555) 987-6543</span>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-foreground">Cardiology Specialist</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-4">
        <h3 className="font-semibold text-foreground mb-3">Professional Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Department:</span>
            <span className="text-foreground">Cardiology</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Experience:</span>
            <span className="text-foreground">12 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hospital:</span>
            <span className="text-foreground">City General Hospital</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Patients Today:</span>
            <span className="text-foreground">8</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-4">
        <h3 className="font-semibold text-foreground mb-3">Certifications</h3>
        <div className="space-y-2">
          <Badge variant="outline" className="mr-2">Board Certified Cardiologist</Badge>
          <Badge variant="outline" className="mr-2">Advanced Life Support</Badge>
          <Badge variant="outline">Interventional Cardiology</Badge>
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