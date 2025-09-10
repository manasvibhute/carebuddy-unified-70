import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, User, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientNotesProps {
  onBack: () => void;
  appointmentId: string;
}

export const PatientNotes = ({ onBack, appointmentId }: PatientNotesProps) => {
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [followUp, setFollowUp] = useState("");
  const { toast } = useToast();

  // Mock appointment data
  const appointmentData = {
    patientName: "John Doe",
    patientAge: 34,
    date: "Today",
    time: "10:00 AM",
    reason: "Follow-up consultation",
    visitType: "Video Call"
  };

  const handleSave = () => {
    toast({
      title: "Notes Saved",
      description: "Patient consultation notes have been saved successfully",
    });
    onBack();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2 mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Patient Notes</h1>
        </div>

        {/* Patient Information */}
        <Card className="p-4 mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {appointmentData.patientName}
              </h2>
              <p className="text-muted-foreground">
                Age: {appointmentData.patientAge} • Patient ID: #P{appointmentId}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-foreground">
                {appointmentData.date} at {appointmentData.time}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <Badge variant="secondary">{appointmentData.visitType}</Badge>
            </div>
          </div>

          <div className="mt-3 p-3 bg-secondary rounded-lg">
            <p className="text-sm text-foreground">
              <span className="font-medium">Reason for visit:</span> {appointmentData.reason}
            </p>
          </div>
        </Card>

        {/* Notes Form */}
        <div className="space-y-4">
          <Card className="p-4">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Primary diagnosis or assessment"
              className="mt-2"
            />
          </Card>

          <Card className="p-4">
            <Label htmlFor="notes">Consultation Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detailed observations, symptoms discussed, examination findings..."
              rows={6}
              className="mt-2"
            />
          </Card>

          <Card className="p-4">
            <Label htmlFor="prescription">Prescription & Treatment</Label>
            <Textarea
              id="prescription"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Medications prescribed, dosage, treatment plan..."
              rows={4}
              className="mt-2"
            />
          </Card>

          <Card className="p-4">
            <Label htmlFor="followUp">Follow-up Instructions</Label>
            <Textarea
              id="followUp"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Next appointment recommendations, monitoring instructions, patient advice..."
              rows={3}
              className="mt-2"
            />
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pb-6">
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Notes
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pb-4">
          All notes are confidential and encrypted. Last saved: Never
        </div>
      </div>
    </div>
  );
};