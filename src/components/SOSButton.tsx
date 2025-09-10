import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const SOSButton = () => {
  const { toast } = useToast();

  const handleSOS = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Your emergency contact has been notified.",
      variant: "destructive",
    });
  };

  return (
    <Button
      onClick={handleSOS}
      size="lg"
      className="fixed bottom-20 right-4 z-50 rounded-full w-14 h-14 bg-emergency hover:bg-emergency/90 text-emergency-foreground shadow-lg"
    >
      <AlertTriangle className="h-6 w-6" />
    </Button>
  );
};