// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// interface Document {
//   id: string;
//   name: string;
//   summary: string;
// }

// interface Patient {
//   id: string;
//   name: string;
//   age: number;
//   condition: string;
//   lastVisit: string;
//   status: string;
//   phone: string;
//   documents: Document[];
// }

// interface PatientDetailProps {
//   patient: Patient;
//   onBack: () => void;
// }

// export const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onBack }) => {
//   return (
//     <div className="min-h-screen bg-background pb-20">
//       <div className="p-4">
//         <Button onClick={onBack} variant="ghost" className="mb-4">Back</Button>
//         <h2 className="text-2xl font-bold mb-2">{patient.name}</h2>
//         <p className="mb-1">Age: {patient.age}</p>
//         <p className="mb-1">Condition: {patient.condition}</p>
//         <p className="mb-1">Last Visit: {patient.lastVisit}</p>
//         <p className="mb-4">Status: {patient.status}</p>
//         <p className="mb-4">Phone: {patient.phone}</p>
//         <h3 className="text-xl font-semibold mb-2">Documents</h3>
//         {patient.documents.length === 0 ? (
//           <p>No documents uploaded.</p>
//         ) : (
//           <div className="space-y-3">
//             {patient.documents.map(doc => (
//               <Card key={doc.id} className="p-4">
//                 <div className="font-medium">{doc.name}</div>
//                 <div className="text-sm text-muted-foreground mb-2">Summary:</div>
//                 <div className="text-sm">{doc.summary}</div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Document {
  id: string;
  name: string;
  summary: string;
  url?: string;
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

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
}

export const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onBack }) => {
  const [viewDocUrl, setViewDocUrl] = useState<string | null>(null);

  const handleDownload = (doc: Document) => {
    if (doc.url) {
      const link = document.createElement("a");
      link.href = doc.url;
      link.download = doc.name;
      link.click();
    } else {
      alert("No file available for download.");
    }
  };

  const handleView = (doc: Document) => {
    if (doc.url) {
      setViewDocUrl(doc.url);
    } else {
      alert("No file available to view.");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <Button onClick={onBack} className="mb-4 bg-green-600 hover:bg-green-700 text-white rounded-xl">
          Back
        </Button>
        <h2 className="text-2xl font-bold mb-2">{patient.name}</h2>
        <p className="mb-1">Age: {patient.age}</p>
        <p className="mb-1">Condition: {patient.condition}</p>
        <p className="mb-1">Last Visit: {patient.lastVisit}</p>
        <p className="mb-4">Status: {patient.status}</p>
        <p className="mb-4">Phone: {patient.phone}</p>
        <h3 className="text-xl font-semibold mb-2">Documents</h3>
        {patient.documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          <div className="space-y-3">
            {patient.documents.map(doc => (
              <Card key={doc.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{doc.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">Summary:</div>
                  <div className="text-sm mb-2">{doc.summary}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
                    size="sm"
                    onClick={() => handleDownload(doc)}
                  >
                    Download
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
                    size="sm"
                    onClick={() => handleView(doc)}
                  >
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
        {viewDocUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl w-full relative">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl absolute top-2 right-2"
                onClick={() => setViewDocUrl(null)}
              >
                Close
              </Button>
              <iframe
                src={viewDocUrl}
                title="Document Viewer"
                className="w-full h-[500px] border rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
