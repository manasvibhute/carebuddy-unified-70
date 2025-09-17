import React, { useRef, useState } from "react";
import { PatientDetail } from "./PatientDetail";

interface Document {
  id: string;
  name: string;
  summary: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: string;
  phone: string;
  documents: Document[];
}

interface PatientsListProps {
  onBack: () => void;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    status: "active",
    phone: "+1 (555) 123-4567",
    documents: [
      { id: "d1", name: "Blood Test.pdf", summary: "Shows elevated cholesterol levels." },
      { id: "d2", name: "ECG Report.pdf", summary: "Normal sinus rhythm detected." }
    ]
  },
  {
    id: "2",
    name: "Mary Smith",
    age: 32,
    condition: "Diabetes Type 2",
    lastVisit: "2024-01-12",
    status: "active",
    phone: "+1 (555) 234-5678",
    documents: [
      { id: "d3", name: "Glucose Report.pdf", summary: "Blood sugar levels are stable." }
    ]
  },
  {
    id: "3",
    name: "Robert Johnson",
    age: 58,
    condition: "Heart Disease",
    lastVisit: "2024-01-10",
    status: "critical",
    phone: "+1 (555) 345-6789",
    documents: []
  }
];

export const PatientsList: React.FC<PatientsListProps> = ({ onBack }) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = (patientId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.patientId = patientId;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const patientId = event.target.dataset.patientId;
    if (files && files.length > 0 && patientId) {
      alert(`Report uploaded for patient ID: ${patientId}`);
      // Add upload logic here
    }
    event.target.value = "";
  };

  if (selectedPatientId) {
    const patient = mockPatients.find(p => p.id === selectedPatientId);
    if (!patient) return null;
    return <PatientDetail patient={patient} onBack={() => setSelectedPatientId(null)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <button onClick={onBack} className="mb-4 px-4 py-2 bg-primary text-white rounded">
          Back
        </button>
        <h2 className="text-xl font-semibold mb-4">Patients</h2>
        <ul className="space-y-4">
          {mockPatients.map((patient) => (
            <li key={patient.id} className="flex items-center justify-between bg-white rounded shadow p-4">
              <div>
                <div className="font-medium">{patient.name}</div>
                <div className="text-sm text-muted-foreground">Age: {patient.age}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPatientId(patient.id)}
                  className="px-3 py-1 bg-accent text-white rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleUploadClick(patient.id)}
                  className="px-3 py-1 bg-primary text-white rounded"
                >
                  Upload Report
                </button>
              </div>
            </li>
          ))}
        </ul>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};