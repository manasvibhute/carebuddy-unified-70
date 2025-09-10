import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const VoiceInput = ({ value, onChange, placeholder, className, disabled }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);
  const [transcription, setTranscription] = useState("");

  const mockTranscriptions = [
    "Dr. Sarah Wilson",
    "I have been experiencing chest pain",
    "Amlodipine 5mg",
    "Tomorrow at 2 PM",
    "Blood pressure medication",
    "Dr. Smith",
    "I need a follow-up appointment"
  ];

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      setShowTranscription(false);
      setTranscription("");
      
      setTimeout(() => {
        if (isRecording) {
          const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
          setTranscription(randomTranscription);
          setShowTranscription(true);
          setIsRecording(false);
        }
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleUseTranscription = () => {
    onChange(transcription);
    setShowTranscription(false);
    setTranscription("");
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleVoiceInput}
          disabled={disabled}
          className={cn(
            "shrink-0",
            isRecording && "bg-destructive text-destructive-foreground animate-pulse"
          )}
        >
          {isRecording ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showTranscription && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-3 bg-card border shadow-lg z-10">
          <div className="space-y-3">
            <p className="text-sm text-foreground">
              <span className="font-medium">Heard: </span>"{transcription}"
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowTranscription(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleUseTranscription}
                className="flex-1"
              >
                Use This
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};