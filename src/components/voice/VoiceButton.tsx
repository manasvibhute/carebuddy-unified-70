import { useState } from "react";
import { Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceAssistant } from "./VoiceAssistant";
import { VoiceReader } from "./VoiceReader";
import { VoiceNavigator } from "./VoiceNavigator";

interface VoiceButtonProps {
  onVoiceInput?: (text: string) => void;
  onNavigate?: (command: string) => void;
  className?: string;
  showReader?: boolean;
}

export const VoiceButton = ({ onVoiceInput, onNavigate, className, showReader = true }: VoiceButtonProps) => {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

  const handleVoiceCommand = (command: string) => {
    if (onNavigate) {
      onNavigate(command);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {showReader && <VoiceReader className={className} />}
      
      <Button
        variant="outline"
        size="icon"
        className={className}
        onClick={() => setIsVoiceOpen(true)}
        title="Voice input"
      >
        <Mic className="h-4 w-4" />
      </Button>
      
      <VoiceAssistant
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onUseInput={onVoiceInput}
        onNavigate={handleVoiceCommand}
      />
      
      <VoiceNavigator
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        onNavigate={handleVoiceCommand}
      />
    </div>
  );
};