import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Users, FileText, Video, LogOut } from "lucide-react";
import { BottomNav } from "../BottomNav";
import { SOSButton } from "../SOSButton";
import { DoctorProfile } from "../profile/DoctorProfile";
import { AppointmentManagement } from "../appointments/AppointmentManagement";
import { PreCallScreen } from "../video/PreCallScreen";
import { InCallScreen } from "../video/InCallScreen";
import { EndCallScreen } from "../video/EndCallScreen";
import { PatientNotes } from "../notes/PatientNotes";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "../voice/VoiceButton";
import { ReportsList } from "../reports/ReportsList";
import { PatientsList } from "../patients/PatientsList";

type DoctorView = "dashboard" | "appointments" | "pre-call" | "in-call" | "end-call" | "notes" | "reports" | "patients";

interface DoctorDashboardProps {
  onLogout: () => void;
}

export const DoctorDashboard = ({ onLogout }: DoctorDashboardProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState<DoctorView>("dashboard");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");

  const handleVoiceNavigation = (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('appointment')) {
      setCurrentView("appointments");
    } else if (cmd.includes('notes')) {
      setCurrentView("notes");
    } else if (cmd.includes('profile')) {
      setActiveTab("profile");
    } else if (cmd.includes('home')) {
      setCurrentView("dashboard");
      setActiveTab("home");
    } else if (cmd.includes('video') || cmd.includes('call')) {
      setCurrentView("pre-call");
    }
  };

  const dashboardCards = [
    {
      title: "Appointments",
      description: "Today's schedule",
      icon: Calendar,
      count: "8 patients",
      action: () => setCurrentView("appointments"),
      bgColor: "bg-primary-light"
    },
    {
      title: "Patients",
      description: "Manage patient records",
      icon: Users,
      count: "45 active",
      action: () => setCurrentView("patients"),
      bgColor: "bg-accent-light"
    },
    {
      title: "Reports",
      description: "Review test results",
      icon: FileText,
      count: "12 pending",
      action: () => setCurrentView("reports"),
      bgColor: "bg-medical-light-blue"
    },
    {
      title: "Video Calls",
      description: "Telemedicine sessions",
      icon: Video,
      count: "3 scheduled",
      action: () => setCurrentView("pre-call"),
      bgColor: "bg-medical-light-green"
    },
  ];

  const handleJoinCall = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setCurrentView("pre-call");
  };

  const handleAddNotes = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setCurrentView("notes");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setActiveTab("home");
  };

  // Video call flow handlers
  const handleJoinCallFromPreCall = () => setCurrentView("in-call");
  const handleEndCall = () => setCurrentView("end-call");
  const handleEndCallToNotes = () => setCurrentView("notes");

  // Handle non-dashboard views
  if (currentView === "appointments") {
    return (
      <AppointmentManagement 
        onBack={handleBackToDashboard}
        onJoinCall={handleJoinCall}
        onAddNotes={handleAddNotes}
      />
    );
  }

  if (currentView === "pre-call") {
    return (
      <PreCallScreen
        onBack={handleBackToDashboard}
        onJoinCall={handleJoinCallFromPreCall}
        appointmentId={selectedAppointmentId}
        userRole="doctor"
      />
    );
  }

  if (currentView === "in-call") {
    return (
      <InCallScreen
        onEndCall={handleEndCall}
        appointmentId={selectedAppointmentId}
        userRole="doctor"
      />
    );
  }

  if (currentView === "end-call") {
    return (
      <EndCallScreen
        onBack={handleBackToDashboard}
        onAddNotes={() => handleEndCallToNotes()}
        appointmentId={selectedAppointmentId}
        userRole="doctor"
        callDuration="15:32"
      />
    );
  }

  if (currentView === "notes") {
    return (
      <PatientNotes
        onBack={handleBackToDashboard}
        appointmentId={selectedAppointmentId}
      />
    );
  }

  if (currentView === "reports") {
    return (
      <ReportsList
        onBack={handleBackToDashboard}
        onScanNew={() => {}}
        onViewReport={(reportId) => {
          console.log("Viewing report:", reportId);
        }}
      />
    );
  }

  if (currentView === "patients") {
    return (
      <PatientsList
        onBack={handleBackToDashboard}
        onViewPatient={(patientId) => {
          console.log("Viewing patient:", patientId);
        }}
      />
    );
  }

  if (activeTab === "profile") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Profile</h2>
            <div className="flex items-center gap-2">
              <VoiceButton onNavigate={handleVoiceNavigation} />
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
        <DoctorProfile />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        <SOSButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Dr. Sarah Wilson
              </h1>
              <p className="text-muted-foreground">Cardiology Department</p>
            </div>
            <VoiceButton onNavigate={handleVoiceNavigation} />
          </div>
        </div>

        {activeTab === "home" && (
          <div className="grid grid-cols-2 gap-4">
            {dashboardCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card 
                  key={card.title} 
                  className={`p-6 cursor-pointer hover:shadow-lg transition-all duration-200 ${card.bgColor} ${card.action ? '' : 'opacity-90'}`}
                  onClick={card.action}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-white/80 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">{card.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{card.description}</p>
                      <p className="text-sm font-medium text-primary">{card.count}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Today's Appointments</h2>
              <button
                onClick={() => setCurrentView("appointments")}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg text-sm"
              >
                Manage All
              </button>
            </div>
            
            <Card className="p-4">
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-medium">John Doe - Follow-up</p>
                  <p className="text-sm text-muted-foreground">9:00 AM - Room 205</p>
                </div>
                <div className="border-l-4 border-accent pl-4 py-2">
                  <p className="font-medium">Mary Smith - Consultation</p>
                  <p className="text-sm text-muted-foreground">10:30 AM - Room 203</p>
                </div>
                <div className="border-l-4 border-warning pl-4 py-2">
                  <p className="font-medium">Robert Johnson - Emergency</p>
                  <p className="text-sm text-muted-foreground">11:00 AM - ER</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "reports" && (
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Pending Reports</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">Blood Test - John Doe</p>
                  <p className="text-sm text-muted-foreground">Lab Results Pending</p>
                </div>
                <FileText className="h-5 w-5 text-warning" />
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">MRI Scan - Mary Smith</p>
                  <p className="text-sm text-muted-foreground">Ready for Review</p>
                </div>
                <FileText className="h-5 w-5 text-success" />
              </div>
            </div>
          </Card>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <SOSButton />
    </div>
  );
};