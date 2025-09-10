import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceReaderProps {
  className?: string;
}

export const VoiceReader = ({ className }: VoiceReaderProps) => {
  const [isReading, setIsReading] = useState(false);

  const handleReadPage = () => {
    if (isReading) {
      // Stop reading
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Start reading page content
      setIsReading(true);
      
      // Get all text content from the page
      const textElements = document.querySelectorAll('h1, h2, h3, p, button, label, span:not(:empty)');
      let textToRead = "";
      
      textElements.forEach((element) => {
        const text = element.textContent?.trim();
        if (text && text.length > 1) {
          textToRead += text + ". ";
        }
      });

      if (textToRead) {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onend = () => {
          setIsReading(false);
        };
        
        utterance.onerror = () => {
          setIsReading(false);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        setIsReading(false);
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={handleReadPage}
      title={isReading ? "Stop reading" : "Read page aloud"}
    >
      {isReading ? (
        <VolumeX className="h-4 w-4 text-primary animate-pulse" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
};