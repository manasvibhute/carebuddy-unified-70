import { Share, Download, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceButton } from "../voice/VoiceButton";

interface ReportDetailProps {
  reportId: string;
  onBack: () => void;
}

export const ReportDetail = ({ reportId, onBack }: ReportDetailProps) => {
  // Mock report data
  const report = {
    id: reportId,
    name: "Blood Test Results",
    type: "Blood Test",
    date: "2024-01-15",
    doctor: "Dr. Sarah Johnson",
    lab: "City Medical Lab",
    results: [
      { test: "Hemoglobin", value: "14.2 g/dL", range: "12.0-15.5", status: "normal" },
      { test: "White Blood Cells", value: "7,200/μL", range: "4,500-11,000", status: "normal" },
      { test: "Platelets", value: "250,000/μL", range: "150,000-450,000", status: "normal" },
      { test: "Glucose", value: "110 mg/dL", range: "70-100", status: "high" },
      { test: "Cholesterol", value: "200 mg/dL", range: "<200", status: "normal" },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-accent";
      case "high": return "text-warning";
      case "low": return "text-info";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "normal": return "bg-accent-light";
      case "high": return "bg-warning/10";
      case "low": return "bg-info/10";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" onClick={onBack}>
          <X className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground truncate">
          {report.name}
        </h1>
        <VoiceButton />
      </div>

      <div className="p-4 space-y-4">
        {/* Report Header */}
        <Card className="p-6 bg-primary-light">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary rounded-lg">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {report.name}
              </h2>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><span className="font-medium">Date:</span> {report.date}</p>
                <p><span className="font-medium">Doctor:</span> {report.doctor}</p>
                <p><span className="font-medium">Lab:</span> {report.lab}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="flex-1">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Test Results */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Test Results</h3>
          <div className="space-y-4">
            {report.results.map((result, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${getStatusBg(result.status)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{result.test}</h4>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(result.status)} ${getStatusBg(result.status)}`}>
                    {result.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">
                    {result.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Normal: {result.range}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notes Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Doctor's Notes</h3>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-foreground">
              Overall results are within normal ranges. Glucose level is slightly elevated - 
              recommend dietary modifications and follow-up in 3 months. Continue current 
              medication regimen.
            </p>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-accent-light">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommendations</h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Follow a low-sugar diet</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Exercise regularly (30 minutes daily)</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Schedule follow-up in 3 months</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};