import { useState, useRef } from "react";
import { Camera, Upload, RotateCcw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceButton } from "../voice/VoiceButton";

interface DocumentScannerProps {
  onComplete: (document: { id: string; name: string; type: string; date: string }) => void;
  onBack: () => void;
}

export const DocumentScanner = ({ onComplete, onBack }: DocumentScannerProps) => {
  const [currentStep, setCurrentStep] = useState<"scan" | "crop" | "confirm">("scan");
  const [documentName, setDocumentName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleScan = () => {
    // Mock scanning process
    setCurrentStep("crop");
  };

  const handleCrop = () => {
    setCurrentStep("confirm");
  };

  const handleConfirm = () => {
    const newDocument = {
      id: Date.now().toString(),
      name: documentName || "Medical Report",
      type: "Blood Test",
      date: new Date().toLocaleDateString()
    };
    onComplete(newDocument);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      console.log("Selected file:", file.name);
      setCurrentStep("crop");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" onClick={onBack}>
          <X className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Scan Document</h1>
        <VoiceButton />
      </div>

      <div className="p-4 space-y-6">
        {/* Step indicator */}
        <div className="flex justify-center space-x-4">
          {["scan", "crop", "confirm"].map((step, index) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step
                ? "bg-primary text-primary-foreground"
                : index < ["scan", "crop", "confirm"].indexOf(currentStep)
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {currentStep === "scan" && (
          <div className="space-y-6">
            <Card className="p-8 text-center bg-medical-light-blue">
              <Camera className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Position Your Document
              </h2>
              <p className="text-muted-foreground mb-6">
                Place the document flat and ensure it's well-lit for best results
              </p>

              {/* Mock camera preview */}
              <div className="bg-muted rounded-lg h-64 mb-6 flex items-center justify-center">
                <p className="text-muted-foreground">Camera Preview</p>
              </div>

              <div className="flex gap-3">
                <>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button variant="outline" className="flex-1" onClick={handleUploadClick}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </>
                <Button onClick={handleScan} className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture
                </Button>
              </div>
            </Card>
          </div>
        )}

        {currentStep === "crop" && (
          <div className="space-y-6">
            <Card className="p-6 bg-medical-light-blue">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Adjust Document Edges
              </h2>

              {/* Mock crop preview */}
              <div className="bg-muted rounded-lg h-64 mb-6 flex items-center justify-center relative">
                {preview ? (
                  <img src={preview} alt="Preview" className="object-contain h-full w-full" />
                ) : (
                  <p className="text-muted-foreground">Document Preview</p>
                )}
                <div className="absolute inset-4 border-2 border-primary border-dashed rounded"></div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep("scan")}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={handleCrop} className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Crop Document
                </Button>
              </div>
            </Card>
          </div>
        )}

        {currentStep === "confirm" && (
          <div className="space-y-6">
            <Card className="p-6 bg-medical-light-green">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Review & Upload
              </h2>

              {/* Document preview */}
              <div className="bg-card rounded-lg p-4 mb-4 border border-border">
                <div className="bg-muted rounded h-32 mb-3 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="Final Document" className="object-contain h-full w-full" />
                  ) : (
                    <p className="text-muted-foreground">Final Document</p>
                  )}
                </div>
              </div>

              {/* Document details */}
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Document name (e.g., Blood Test Report)"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full px-3 py-2 border border-input-border rounded-lg bg-input text-foreground"
                />
                <select className="w-full px-3 py-2 border border-input-border rounded-lg bg-input text-foreground">
                  <option>Blood Test</option>
                  <option>X-Ray</option>
                  <option>MRI Scan</option>
                  <option>Prescription</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep("crop")}>
                  Back
                </Button>
                <Button onClick={handleConfirm} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Report
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};