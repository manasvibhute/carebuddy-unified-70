import { useState } from "react";
import { Mic, MicOff, X, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VoiceNavigatorProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (command: string) => void;
}

export const VoiceNavigator = ({ isOpen, onClose, onNavigate }: VoiceNavigatorProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [showTranscription, setShowTranscription] = useState(false);

  const navigationCommands = [
    "Go to appointments",
    "Open reports",
    "Show pharmacy",
    "View profile",
    "Go to home",
    "Show medicines",
    "Book appointment",
    "View cart"
  ];

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscription("");
      setShowTranscription(false);
      
      setTimeout(() => {
        if (isRecording) {
          const randomCommand = navigationCommands[Math.floor(Math.random() * navigationCommands.length)];
          setTranscription(randomCommand);
          setShowTranscription(true);
          setIsRecording(false);
        }
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleExecuteCommand = () => {
    if (onNavigate && transcription) {
      onNavigate(transcription.toLowerCase());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Voice Navigation</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              className={cn(
                "w-24 h-24 rounded-full transition-all duration-300",
                isRecording && "animate-pulse"
              )}
              onClick={handleToggleRecording}
            >
              {isRecording ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              {isRecording ? "Listening for command..." : "Say where you want to go"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isRecording 
                ? "Try: 'Go to appointments' or 'Open reports'" 
                : "Voice commands: appointments, reports, pharmacy, profile"
              }
            </p>
          </div>

          {showTranscription && transcription && (
            <div className="space-y-4">
              <Card className="p-4 bg-primary-light">
                <p className="text-sm text-foreground font-medium">
                  "{transcription}"
                </p>
              </Card>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleToggleRecording}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={handleExecuteCommand}
                  className="flex-1"
                >
                  Go There
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};