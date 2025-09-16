// // import { useState } from "react";
// // import { User, Search, Eye, Phone, X, Calendar } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Badge } from "@/components/ui/badge";
// // import { VoiceButton } from "../voice/VoiceButton";

// // interface Patient {
// //   id: string;
// //   name: string;
// //   age: number;
// //   condition: string;
// //   lastVisit: string;
// //   status: "active" | "inactive" | "critical";
// //   phone: string;
// // }

// // interface PatientsListProps {
// //   onBack: () => void;
// //   onViewPatient: (patientId: string) => void;
// // }

// // export const PatientsList = ({ onBack, onViewPatient }: PatientsListProps) => {
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const mockPatients: Patient[] = [
// //     { id: "1", name: "John Doe", age: 45, condition: "Hypertension", lastVisit: "2024-01-15", status: "active", phone: "+1 (555) 123-4567" },
// //     { id: "2", name: "Mary Smith", age: 32, condition: "Diabetes Type 2", lastVisit: "2024-01-12", status: "active", phone: "+1 (555) 234-5678" },
// //     { id: "3", name: "Robert Johnson", age: 58, condition: "Heart Disease", lastVisit: "2024-01-10", status: "critical", phone: "+1 (555) 345-6789" },
// //     { id: "4", name: "Sarah Wilson", age: 28, condition: "Asthma", lastVisit: "2024-01-08", status: "active", phone: "+1 (555) 456-7890" },
// //     { id: "5", name: "Michael Brown", age: 65, condition: "Arthritis", lastVisit: "2024-01-05", status: "inactive", phone: "+1 (555) 567-8901" },
// //   ];

// //   const filteredPatients = mockPatients.filter(patient =>
// //     patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
// //       case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
// //       case "inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
// //       default: return "bg-muted text-muted-foreground";
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header */}
// //       <div className="flex items-center justify-between p-4 border-b border-border">
// //         <Button variant="ghost" onClick={onBack}>
// //           <X className="h-5 w-5" />
// //         </Button>
// //         <h1 className="text-xl font-semibold text-foreground">My Patients</h1>
// //         <VoiceButton onVoiceInput={(text) => setSearchQuery(text)} />
// //       </div>

// //       <div className="p-4 space-y-4">
// //         {/* Search */}
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
// //           <Input
// //             placeholder="Search patients..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="pl-10"
// //           />
// //         </div>

// //         {/* Patients List */}
// //         <div className="space-y-3">
// //           {filteredPatients.map((patient) => (
// //             <Card key={patient.id} className="p-4 hover:shadow-md transition-shadow">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-4 flex-1">
// //                   <div className="p-2 bg-primary-light rounded-full">
// //                     <User className="h-6 w-6 text-primary" />
// //                   </div>
                  
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex items-center gap-2 mb-1">
// //                       <h3 className="font-semibold text-foreground truncate">
// //                         {patient.name}
// //                       </h3>
// //                       <Badge variant="outline" className={getStatusColor(patient.status)}>
// //                         {patient.status}
// //                       </Badge>
// //                     </div>
                    
// //                     <div className="space-y-1">
// //                       <p className="text-sm text-muted-foreground">
// //                         Age: {patient.age} • {patient.condition}
// //                       </p>
// //                       <p className="text-sm text-muted-foreground">
// //                         Last visit: {patient.lastVisit}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-2">
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => onViewPatient(patient.id)}
// //                   >
// //                     <Eye className="h-4 w-4 mr-1" />
// //                     View
// //                   </Button>
// //                   <Button variant="outline" size="sm">
// //                     <Phone className="h-4 w-4" />
// //                   </Button>
// //                   <Button variant="outline" size="sm">
// //                     <Calendar className="h-4 w-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //             </Card>
// //           ))}
// //         </div>

// //         {filteredPatients.length === 0 && (
// //           <div className="text-center py-12">
// //             <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
// //             <h3 className="text-lg font-semibold text-foreground mb-2">
// //               No patients found
// //             </h3>
// //             <p className="text-muted-foreground">
// //               {searchQuery ? "Try a different search term" : "No patients assigned yet"}
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };


// import React, { useRef } from "react";

// interface PatientsListProps {
//   onBack: () => void;
//   onViewPatient: (patientId: string) => void;
// }

// const patients = [
//   { id: "1", name: "John Doe", age: 45 },
//   { id: "2", name: "Mary Smith", age: 52 },
//   { id: "3", name: "Robert Johnson", age: 38 },
// ];

// export const PatientsList: React.FC<PatientsListProps> = ({ onBack, onViewPatient }) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleUploadClick = (patientId: string) => {
//     if (fileInputRef.current) {
//       fileInputRef.current.dataset.patientId = patientId;
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     const patientId = event.target.dataset.patientId;
//     if (files && files.length > 0 && patientId) {
//       // Handle file upload logic here
//       alert(`Report uploaded for patient ID: ${patientId}`);
//       // You can add your upload logic here (e.g., API call)
//     }
//     event.target.value = ""; // Reset input
//   };

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       <div className="p-4">
//         <button onClick={onBack} className="mb-4 px-4 py-2 bg-primary text-white rounded">
//           Back
//         </button>
//         <h2 className="text-xl font-semibold mb-4">Patients</h2>
//         <ul className="space-y-4">
//           {patients.map((patient) => (
//             <li key={patient.id} className="flex items-center justify-between bg-white rounded shadow p-4">
//               <div>
//                 <div className="font-medium">{patient.name}</div>
//                 <div className="text-sm text-muted-foreground">Age: {patient.age}</div>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => onViewPatient(patient.id)}
//                   className="px-3 py-1 bg-accent text-white rounded"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleUploadClick(patient.id)}
//                   className="px-3 py-1 bg-primary text-white rounded"
//                 >
//                   Upload Report
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {/* Hidden file input for uploading */}
//         <input
//           type="file"
//           accept=".pdf,.jpg,.png"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };


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