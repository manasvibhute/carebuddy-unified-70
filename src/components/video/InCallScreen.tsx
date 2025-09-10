import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Camera, MessageSquare } from "lucide-react";

interface InCallScreenProps {
  onEndCall: () => void;
  appointmentId: string;
  userRole: "patient" | "doctor";
}

export const InCallScreen = ({ onEndCall, appointmentId, userRole }: InCallScreenProps) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);

  // Mock appointment data
  const appointmentData = {
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    specialty: "Cardiology"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const VideoPlaceholder = ({ name, isLocal = false }: { name: string; isLocal?: boolean }) => (
    <div className={`relative rounded-lg overflow-hidden ${isLocal ? 'aspect-[3/4]' : 'aspect-video'}`}>
      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Camera className="h-8 w-8 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute bottom-2 left-2">
        <Badge variant="secondary" className="text-xs">
          {name} {isLocal && "(You)"}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-foreground">
              {userRole === "patient" 
                ? `Dr. ${appointmentData.doctorName.split(' ')[1]}`
                : appointmentData.patientName
              }
            </h2>
            <p className="text-sm text-muted-foreground">
              {userRole === "patient" && appointmentData.specialty} • {formatDuration(callDuration)}
            </p>
          </div>
          <Badge variant="default" className="bg-success text-success-foreground">
            Connected
          </Badge>
        </div>
      </div>

      {/* Video Area */}
      <div className="p-4 flex-1">
        {/* Remote Video (Main) */}
        <div className="mb-4">
          <VideoPlaceholder 
            name={userRole === "patient" ? appointmentData.doctorName : appointmentData.patientName}
          />
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <div className="fixed top-20 right-4 w-24 z-10">
          {cameraEnabled ? (
            <VideoPlaceholder 
              name={userRole === "patient" ? "You" : "Dr. You"}
              isLocal={true}
            />
          ) : (
            <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
              <VideoOff className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Chat Panel (if shown) */}
        {showChat && (
          <Card className="fixed bottom-20 left-4 right-4 h-48 p-4 bg-card/95 backdrop-blur">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-foreground">Chat</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                ×
              </Button>
            </div>
            <div className="flex-1 bg-muted rounded p-2 mb-3 text-sm text-muted-foreground">
              Chat messages would appear here...
            </div>
            <div className="flex gap-2">
              <input 
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded" 
                placeholder="Type a message..."
              />
              <Button size="sm">Send</Button>
            </div>
          </Card>
        )}
      </div>

      {/* Controls */}
      <div className="fixed bottom-4 left-4 right-4">
        <Card className="p-4">
          <div className="flex justify-center space-x-4">
            <Button
              variant={cameraEnabled ? "default" : "outline"}
              size="lg"
              onClick={() => setCameraEnabled(!cameraEnabled)}
              className={cameraEnabled ? "bg-primary hover:bg-primary-hover" : "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"}
            >
              {cameraEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={micEnabled ? "default" : "outline"}
              size="lg"
              onClick={() => setMicEnabled(!micEnabled)}
              className={micEnabled ? "bg-primary hover:bg-primary-hover" : "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"}
            >
              {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onEndCall}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};