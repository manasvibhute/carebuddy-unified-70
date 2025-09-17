// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Heart, Shield, Clock, Users, Timer, Lock } from "lucide-react";

// interface HomePageProps {
//   onLogin: () => void;
//   onSignup: () => void;
// }

// export const HomePage = ({ onLogin, onSignup }: HomePageProps) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-accent/10 via-primary/5 to-medical-light-blue">
//       {/* Header */}
//       <header className="flex items-center justify-between p-6">
//         <div className="flex items-center space-x-2">
//           <div className="p-2 bg-accent rounded-xl">
//             <Heart className="h-6 w-6 text-white" />
//           </div>
//           <span className="text-xl font-bold text-foreground">HealthCare</span>
//         </div>
//         <nav className="hidden md:flex items-center space-x-8">
//           <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
//           <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
//           <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Resources</a>
//           <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
//         </nav>
//         <div className="flex items-center space-x-3">
//           <Button variant="ghost" onClick={onLogin} className="hidden md:flex">
//             Login
//           </Button>
//           <Button onClick={onSignup} className="bg-accent hover:bg-accent/90 text-white rounded-xl px-6">
//             Get Started
//           </Button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="px-6 py-12 md:py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Content */}
//             <div className="space-y-8">
//               <div className="space-y-6">
//                 <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//                   <span className="text-foreground">Your Health, </span>
//                   <span className="text-accent">Your Care, Anytime.</span>
//                 </h1>
//                 <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
//                   Take our quick, science-backed assessment to understand your health needs. 
//                   Get personalized care recommendations in minutes.
//                 </p>
//               </div>

//               {/* Trust Indicators */}
//               <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
//                 <div className="flex items-center space-x-2">
//                   <Users className="h-4 w-4 text-accent" />
//                   <span>50K+ Users Trusted</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Timer className="h-4 w-4 text-accent" />
//                   <span>5 Min Assessment</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Lock className="h-4 w-4 text-accent" />
//                   <span>Privacy Protected</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button 
//                   onClick={onSignup}
//                   size="lg"
//                   className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl px-8 h-14 text-lg font-semibold shadow-lg"
//                 >
//                   Start Your Assessment →
//                 </Button>
//                 <Button 
//                   onClick={onLogin}
//                   variant="outline"
//                   size="lg"
//                   className="rounded-xl px-8 h-14 text-lg font-semibold border-2 hover:bg-accent/5"
//                 >
//                   Learn More
//                 </Button>
//               </div>
//             </div>

//             {/* Right Side - Illustration Area */}
//             <div className="relative">
//               <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
//                 <div className="grid grid-cols-2 gap-6">
//                   <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-0">
//                     <Heart className="h-10 w-10 text-accent mb-4" />
//                     <h3 className="font-semibold text-foreground mb-2">Personalized Care</h3>
//                     <p className="text-sm text-muted-foreground">Tailored health recommendations just for you</p>
//                   </Card>
//                   <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-0 mt-8">
//                     <Shield className="h-10 w-10 text-primary mb-4" />
//                     <h3 className="font-semibold text-foreground mb-2">Secure & Safe</h3>
//                     <p className="text-sm text-muted-foreground">Your health data is always protected</p>
//                   </Card>
//                   <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-0 -mt-4">
//                     <Clock className="h-10 w-10 text-accent mb-4" />
//                     <h3 className="font-semibold text-foreground mb-2">24/7 Access</h3>
//                     <p className="text-sm text-muted-foreground">Get care whenever you need it</p>
//                   </Card>
//                   <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-0 mt-4">
//                     <Users className="h-10 w-10 text-primary mb-4" />
//                     <h3 className="font-semibold text-foreground mb-2">Expert Team</h3>
//                     <p className="text-sm text-muted-foreground">Connect with certified healthcare professionals</p>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
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

<<<<<<< HEAD
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
        <Button onClick={onBack} className="mb-4 rounded-xl bg-green-600 hover:bg-green-700 text-white">
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
              <Card key={doc.id} className="p-4 flex items-center justify-between rounded-2xl">
                <div>
                  <div className="font-medium">{doc.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">Summary:</div>
                  <div className="text-sm mb-2">{doc.summary}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="solid"
                    size="sm"
                    className="rounded-xl bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleDownload(doc)}
                  >
                    Download
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    className="rounded-xl bg-green-600 hover:bg-green-700 text-white"
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
                variant="ghost"
                className="absolute top-2 right-2 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setViewDocUrl(null)}
              >
                Close
              </Button>
              <iframe
                src={viewDocUrl}
                title="Document Viewer"
                className="w-full h-[500px] border rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;