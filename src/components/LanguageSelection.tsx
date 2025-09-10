import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
  onBack: () => void;
}

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
];

export const LanguageSelection = ({ onLanguageSelect, onBack }: LanguageSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-medical-light-green p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Globe className="h-6 w-6 text-medical-blue mr-2" />
          <h2 className="text-xl font-semibold text-medical-blue">Select Language</h2>
        </div>
        <div className="w-10" />
      </div>

      {/* Language Options */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-4 max-w-sm mx-auto w-full">
          {languages.map((language) => (
            <Card
              key={language.code}
              className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
            >
              <Button
                variant="ghost"
                className="w-full h-20 flex flex-col items-center justify-center space-y-1 text-left rounded-xl"
                onClick={() => onLanguageSelect(language.code)}
              >
                <span className="text-lg font-semibold text-medical-blue">
                  {language.name}
                </span>
                <span className="text-2xl font-medium text-foreground/70">
                  {language.native}
                </span>
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 pb-4">
        <p className="text-sm text-foreground/60">
          You can change this later in settings
        </p>
      </div>
    </div>
  );
};