import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, Star, Home } from "lucide-react";

interface EndCallScreenProps {
  onBack: () => void;
  onAddNotes?: () => void;
  appointmentId: string;
  userRole: "patient" | "doctor";
  callDuration: string;
}

export const EndCallScreen = ({ 
  onBack, 
  onAddNotes, 
  appointmentId, 
  userRole, 
  callDuration = "15:32" 
}: EndCallScreenProps) => {
  // Mock appointment data
  const appointmentData = {
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    specialty: "Cardiology",
    date: "Today",
    time: "10:00 AM"
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-success-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Call Completed
          </h1>
          <p className="text-muted-foreground">
            Your consultation has ended successfully
          </p>
        </div>

        {/* Call Summary */}
        <Card className="p-4 mb-4">
          <h2 className="font-semibold text-foreground mb-3">Call Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {userRole === "patient" ? "Doctor:" : "Patient:"}
              </span>
              <span className="text-foreground font-medium">
                {userRole === "patient" ? appointmentData.doctorName : appointmentData.patientName}
              </span>
            </div>
            
            {userRole === "patient" && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Specialty:</span>
                <Badge variant="secondary">{appointmentData.specialty}</Badge>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date & Time:</span>
              <span className="text-foreground">
                {appointmentData.date} at {appointmentData.time}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Duration:</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-primary" />
                <span className="text-foreground">{callDuration}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        {userRole === "patient" && (
          <Card className="p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span className="text-muted-foreground">
                  You'll receive a consultation summary via email
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span className="text-muted-foreground">
                  Any prescriptions will be sent to your pharmacy
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span className="text-muted-foreground">
                  Follow-up appointments can be booked anytime
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {userRole === "patient" && (
            <Card className="p-4">
              <div className="text-center mb-3">
                <h4 className="font-medium text-foreground">Rate your experience</h4>
                <p className="text-sm text-muted-foreground">Help us improve our service</p>
              </div>
              <div className="flex justify-center space-x-2 mb-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button key={rating} variant="ghost" size="sm" className="p-1">
                    <Star className="h-6 w-6 text-muted-foreground hover:text-warning" />
                  </Button>
                ))}
              </div>
            </Card>
          )}

          {userRole === "doctor" && onAddNotes && (
            <Button
              onClick={onAddNotes}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
              Add Consultation Notes
            </Button>
          )}

          <Button
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {userRole === "patient" && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            Need immediate help? Use the SOS button on your dashboard
          </p>
        )}
      </div>
    </div>
  );
};