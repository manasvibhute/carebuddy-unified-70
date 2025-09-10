import { useState } from "react";
import { Mic, MicOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onUseInput?: (text: string) => void;
  onNavigate?: (command: string) => void;
}

export const VoiceAssistant = ({ isOpen, onClose, onUseInput, onNavigate }: VoiceAssistantProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [showTranscription, setShowTranscription] = useState(false);

  const handleToggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      setTranscription("");
      setShowTranscription(false);
      
      // Mock transcription after a delay
      setTimeout(() => {
        if (isRecording) {
          const mockTranscriptions = [
            "I need to book an appointment with Dr. Smith",
            "Show me my recent blood test results",
            "Order my regular blood pressure medication",
            "When is my next appointment?",
            "I'm having chest pain, please help",
            "Go to appointments",
            "Open reports",
            "Show pharmacy",
            "View my profile"
          ];
          const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
          setTranscription(randomTranscription);
          setShowTranscription(true);
          setIsRecording(false);
        }
      }, 2000);
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const handleUseInput = () => {
    if (transcription) {
      // Check if it's a navigation command
      const navigationKeywords = ['go to', 'open', 'show', 'view'];
      const isNavigationCommand = navigationKeywords.some(keyword => 
        transcription.toLowerCase().includes(keyword)
      );
      
      if (isNavigationCommand && onNavigate) {
        onNavigate(transcription.toLowerCase());
      } else if (onUseInput) {
        onUseInput(transcription);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">Voice Assistant</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center space-y-6">
          {/* Recording button */}
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

          {/* Status text */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              {isRecording ? "Listening..." : "Tap to speak"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isRecording 
                ? "Speak clearly and we'll transcribe your message" 
                : "Use voice commands to navigate the app"
              }
            </p>
          </div>

          {/* Transcription results */}
          {showTranscription && transcription && (
            <div className="space-y-4">
              <Card className="p-4 bg-primary-light">
                <p className="text-sm text-foreground">
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
                  onClick={handleUseInput}
                  className="flex-1"
                >
                  {transcription.toLowerCase().includes('go to') || 
                   transcription.toLowerCase().includes('open') || 
                   transcription.toLowerCase().includes('show') || 
                   transcription.toLowerCase().includes('view') ? 'Navigate' : 'Use as Input'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};