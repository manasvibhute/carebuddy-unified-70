import { useState } from "react";
import { FileText, Plus, Search, Eye, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VoiceButton } from "../voice/VoiceButton";
import { VoiceInput } from "../voice/VoiceInput";

interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  status: "new" | "viewed";
}

interface ReportsListProps {
  onBack: () => void;
  onScanNew: () => void;
  onViewReport: (reportId: string) => void;
  reports?: Report[];
}

export const ReportsList = ({ onBack, onScanNew, onViewReport, reports = [] }: ReportsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const mockReports: Report[] = [
    { id: "1", name: "Blood Test Results", type: "Blood Test", date: "2024-01-15", status: "new" },
    { id: "2", name: "Chest X-Ray", type: "X-Ray", date: "2024-01-10", status: "viewed" },
    { id: "3", name: "MRI Brain Scan", type: "MRI", date: "2024-01-05", status: "viewed" },
    { id: "4", name: "ECG Report", type: "ECG", date: "2024-01-01", status: "viewed" },
    ...reports
  ];

  const filteredReports = mockReports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "blood test": return "bg-medical-light-blue text-primary";
      case "x-ray": return "bg-medical-light-green text-accent";
      case "mri": return "bg-primary-light text-primary";
      case "ecg": return "bg-accent-light text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" onClick={onBack}>
          <X className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Medical Reports</h1>
        <VoiceButton onVoiceInput={(text) => setSearchQuery(text)} />
      </div>

      <div className="p-4 space-y-4">
        {/* Search and Add */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={onScanNew}>
            <Plus className="h-4 w-4 mr-2" />
            Scan New
          </Button>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <Card key={report.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {report.name}
                      </h3>
                      {report.status === "new" && (
                        <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {report.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewReport(report.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No reports found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try a different search term" : "Start by scanning your first medical report"}
            </p>
            <Button onClick={onScanNew}>
              <Plus className="h-4 w-4 mr-2" />
              Scan New Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};