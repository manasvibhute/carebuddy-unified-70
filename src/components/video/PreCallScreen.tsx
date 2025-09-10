import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Video, VideoOff, Mic, MicOff, Camera, Settings } from "lucide-react";

interface PreCallScreenProps {
  onBack: () => void;
  onJoinCall: () => void;
  appointmentId: string;
  userRole: "patient" | "doctor";
}

export const PreCallScreen = ({ onBack, onJoinCall, appointmentId, userRole }: PreCallScreenProps) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Mock appointment data - in real app this would come from props/API
  const appointmentData = {
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    time: "10:00 AM",
    date: "Today",
    specialty: "Cardiology"
  };

  useEffect(() => {
    // Simulate camera/mic setup check
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2 mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Video Consultation</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {userRole === "patient" 
                ? `Consultation with ${appointmentData.doctorName}`
                : `Consultation with ${appointmentData.patientName}`
              }
            </h2>
            <p className="text-muted-foreground">
              {appointmentData.date} at {appointmentData.time}
            </p>
            {userRole === "patient" && (
              <Badge variant="secondary" className="mt-2">
                {appointmentData.specialty}
              </Badge>
            )}
          </div>
        </Card>

        {/* Camera Preview */}
        <Card className="p-4 mb-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
            {cameraEnabled ? (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <Camera className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-muted-foreground">
                <VideoOff className="h-12 w-12 mb-2" />
                <p className="text-sm">Camera is off</p>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant={cameraEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setCameraEnabled(!cameraEnabled)}
              className={cameraEnabled ? "bg-primary hover:bg-primary-hover" : "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"}
            >
              {cameraEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>

            <Button
              variant={micEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setMicEnabled(!micEnabled)}
              className={micEnabled ? "bg-primary hover:bg-primary-hover" : "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"}
            >
              {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* System Check */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3">System Check</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Camera:</span>
              <Badge variant={cameraEnabled ? "default" : "destructive"}>
                {cameraEnabled ? "Working" : "Disabled"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Microphone:</span>
              <Badge variant={micEnabled ? "default" : "destructive"}>
                {micEnabled ? "Working" : "Disabled"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Connection:</span>
              <Badge variant={isReady ? "default" : "secondary"}>
                {isReady ? "Ready" : "Checking..."}
              </Badge>
            </div>
          </div>
        </Card>

        <Button
          onClick={onJoinCall}
          disabled={!isReady}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Video className="h-4 w-4 mr-2" />
          {isReady ? "Join Call" : "Preparing..."}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Make sure you're in a quiet environment with good lighting
        </p>
      </div>
    </div>
  );
};