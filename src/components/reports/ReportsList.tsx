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
  patient: {
    name: string;
    gender: string;
    dob: string;
    record: string;
  };
}

interface ReportsListProps {
  onBack: () => void;
  onScanNew: () => void;
  onViewReport: (reportId: string) => void;
  reports?: Report[];
}

export const ReportsList = ({ onBack, onScanNew, onViewReport, reports = [] }: ReportsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  const mockReports: Report[] = [
    {
      id: "1",
      name: "Blood Test Results",
      type: "Blood Test",
      date: "2024-01-15",
      status: "new",
      patient: {
        name: "Sabrina Welder",
        gender: "F",
        dob: "April 8, 1993",
        record: "00-991-23"
      }
    },
    {
      id: "2",
      name: "Chest X-Ray",
      type: "X-Ray",
      date: "2024-01-10",
      status: "viewed",
      patient: {
        name: "John Doe",
        gender: "M",
        dob: "May 12, 1987",
        record: "01-234-56"
      }
    },
    {
      id: "3",
      name: "MRI Brain Scan",
      type: "MRI",
      date: "2024-01-05",
      status: "viewed",
      patient: {
        name: "Priya Singh",
        gender: "F",
        dob: "Nov 22, 1990",
        record: "02-345-67"
      }
    },
    {
      id: "4",
      name: "ECG Report",
      type: "ECG",
      date: "2024-01-01",
      status: "viewed",
      patient: {
        name: "Alex Kim",
        gender: "M",
        dob: "Feb 3, 1975",
        record: "03-456-78"
      }
    },
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
    <>
      {/* Modal for Blood Test Results */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          style={{ cursor: "pointer" }}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-0 flex flex-col"
            style={{ maxHeight: "90vh" }}>
            {/* Close Button */}
            <Button
              variant="destructive"
              className="absolute top-4 right-4 z-10 rounded-full"
              onClick={() => setShowImageModal(false)}
              style={{ width: 40, height: 40, padding: 0, fontSize: 20 }}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-6" style={{ maxHeight: "90vh" }}>
              <img
                src="https://www.carepatron.com/files/mch-blood-test-reports-example.jpg"
                alt="Blood Test Results"
                className="max-w-full max-h-96 rounded-xl shadow-lg mx-auto mb-6"
              />
              {/* AI Extracted Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl shadow p-4">
                  <h2 className="text-lg font-bold mb-2 text-primary">Patient Information</h2>
                  <ul className="ml-4 list-disc text-sm">
                    <li><strong>Name:</strong> Sabrina Welder</li>
                    <li><strong>Gender:</strong> F</li>
                    <li><strong>Date of birth:</strong> April 8, 1993</li>
                    <li><strong>Date of test:</strong> February 12, 2023</li>
                    <li><strong>Medical record number:</strong> 00-991-23</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl shadow p-4">
                  <h2 className="text-lg font-bold mb-2 text-primary">Clinical History</h2>
                  <ul className="ml-4 list-disc text-sm">
                    <li>N/A</li>
                    <li>Routine check-up</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl shadow p-4">
                  <h2 className="text-lg font-bold mb-2 text-primary">Test Results</h2>
                  <table className="w-full text-sm border mt-2 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1">Test</th>
                        <th className="border px-2 py-1">Result</th>
                        <th className="border px-2 py-1">Reference range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">Hemoglobin (Hb)</td>
                        <td className="border px-2 py-1">14.2 g/dL</td>
                        <td className="border px-2 py-1">13.5 - 17.5 g/dL</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Hematocrit (Hct)</td>
                        <td className="border px-2 py-1">42.0%</td>
                        <td className="border px-2 py-1">38.3 - 48.6%</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Red Blood Cell Count (RBC)</td>
                        <td className="border px-2 py-1">5.2 x10^6/μL</td>
                        <td className="border px-2 py-1">4.5 - 6.0 x10^6/μL</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Mean Corpuscular Hemoglobin (MCH)</td>
                        <td className="border px-2 py-1">27.3 pg</td>
                        <td className="border px-2 py-1">27.0 - 33.0 pg</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Mean Corpuscular Hemoglobin Concentration (MCHC)</td>
                        <td className="border px-2 py-1">32.5 g/dL</td>
                        <td className="border px-2 py-1">31.5 - 35.5 g/dL</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Red Cell Distribution Width (RDW)</td>
                        <td className="border px-2 py-1">12.4%</td>
                        <td className="border px-2 py-1">11.5 - 14.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 rounded-xl shadow p-4">
                  <h2 className="text-lg font-bold mb-2 text-primary">Interpretation</h2>
                  <p className="text-sm">
                    All the test results fall within the reference ranges. This indicates that the levels of hemoglobin, hematocrit, red blood cell count, mean corpuscular hemoglobin, mean corpuscular hemoglobin concentration, and red cell distribution width are all within the expected and healthy range for this patient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
                      <div className="text-xs text-muted-foreground mb-1">
                        Patient: {report.patient.name} &bull; {report.patient.gender} &bull; DOB: {report.patient.dob} &bull; Record: {report.patient.record}
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
                      onClick={() => {
                        if (report.id === "1") {
                          setShowImageModal(true);
                        } else {
                          onViewReport(report.id);
                        }
                      }}
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
    </>
  );
};