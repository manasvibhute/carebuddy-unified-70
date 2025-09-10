import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, FileText, Pill, Video, LogOut } from "lucide-react";
import { BottomNav } from "../BottomNav";
import { SOSButton } from "../SOSButton";
import { PatientProfile } from "../profile/PatientProfile";
import { BookAppointment } from "../appointments/BookAppointment";
import { AppointmentList } from "../appointments/AppointmentList";
import { PreCallScreen } from "../video/PreCallScreen";
import { InCallScreen } from "../video/InCallScreen";
import { EndCallScreen } from "../video/EndCallScreen";
import { VoiceButton } from "../voice/VoiceButton";
import { DocumentScanner } from "../reports/DocumentScanner";
import { ReportsList } from "../reports/ReportsList";
import { ReportDetail } from "../reports/ReportDetail";
import { MedicineList } from "../pharmacy/MedicineList";
import { MedicineDetail } from "../pharmacy/MedicineDetail";
import { Cart } from "../pharmacy/Cart";
import { OrderConfirmation } from "../pharmacy/OrderConfirmation";
import { Button } from "@/components/ui/button";

type PatientView = "dashboard" | "book-appointment" | "appointment-list" | "pre-call" | "in-call" | "end-call" |
  "scan-document" | "reports-list" | "report-detail" | "medicine-list" | "medicine-detail" | "cart" | "order-confirmation";

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  price: number;
  category: string;
  inStock: boolean;
  prescription: boolean;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  prescription: boolean;
}

interface PatientDashboardProps {
  onLogout: () => void;
}

export const PatientDashboard = ({ onLogout }: PatientDashboardProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState<PatientView>("dashboard");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const dashboardCards = [
    {
      title: "Appointments",
      description: "Book and manage appointments",
      icon: Calendar,
      count: "2 upcoming",
      action: () => setCurrentView("appointment-list"),
      bgColor: "bg-primary-light"
    },
    {
      title: "Reports",
      description: "View medical reports",
      icon: FileText,
      count: "5 reports",
      action: () => setCurrentView("reports-list"),
      bgColor: "bg-accent-light"
    },
    {
      title: "Pharmacy",
      description: "Order medicines",
      icon: Pill,
      count: "3 prescriptions",
      action: () => setCurrentView("medicine-list"),
      bgColor: "bg-medical-light-blue"
    },
    {
      title: "Video Calls",
      description: "Consult with doctors",
      icon: Video,
      count: "Available",
      action: () => setCurrentView("pre-call"),
      bgColor: "bg-medical-light-green"
    },
  ];

  const handleJoinCall = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setCurrentView("pre-call");
  };

  const handleVoiceNavigation = (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('appointment')) {
      if (cmd.includes('book')) {
        setCurrentView("book-appointment");
      } else {
        setCurrentView("appointment-list");
      }
    } else if (cmd.includes('report')) {
      setCurrentView("reports-list");
    } else if (cmd.includes('medicine') || cmd.includes('pharmacy')) {
      setCurrentView("medicine-list");
    } else if (cmd.includes('cart')) {
      setCurrentView("cart");
    } else if (cmd.includes('profile')) {
      setActiveTab("profile");
    } else if (cmd.includes('home')) {
      setCurrentView("dashboard");
      setActiveTab("home");
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setActiveTab("home");
  };

  // Video call flow handlers
  const handleJoinCallFromPreCall = () => setCurrentView("in-call");
  const handleEndCall = () => setCurrentView("end-call");

  // Handle non-dashboard views
  if (currentView === "book-appointment") {
    return <BookAppointment onBack={handleBackToDashboard} />;
  }

  if (currentView === "appointment-list") {
    return (
      <AppointmentList 
        onBack={handleBackToDashboard} 
        onJoinCall={handleJoinCall}
      />
    );
  }

  if (currentView === "pre-call") {
    return (
      <PreCallScreen
        onBack={handleBackToDashboard}
        onJoinCall={handleJoinCallFromPreCall}
        appointmentId={selectedAppointmentId}
        userRole="patient"
      />
    );
  }

  if (currentView === "in-call") {
    return (
      <InCallScreen
        onEndCall={handleEndCall}
        appointmentId={selectedAppointmentId}
        userRole="patient"
      />
    );
  }

  if (currentView === "end-call") {
    return (
      <EndCallScreen
        onBack={handleBackToDashboard}
        appointmentId={selectedAppointmentId}
        userRole="patient"
        callDuration="15:32"
      />
    );
  }

  // Reports flows
  if (currentView === "scan-document") {
    return (
      <DocumentScanner
        onComplete={(doc) => {
          console.log("Document scanned:", doc);
          setCurrentView("reports-list");
        }}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentView === "reports-list") {
    return (
      <ReportsList
        onBack={handleBackToDashboard}
        onScanNew={() => setCurrentView("scan-document")}
        onViewReport={(reportId) => {
          setSelectedReportId(reportId);
          setCurrentView("report-detail");
        }}
      />
    );
  }

  if (currentView === "report-detail") {
    return (
      <ReportDetail
        reportId={selectedReportId}
        onBack={() => setCurrentView("reports-list")}
      />
    );
  }

  // Pharmacy flows
  if (currentView === "medicine-list") {
    return (
      <MedicineList
        onBack={handleBackToDashboard}
        onMedicineSelect={(medicine) => {
          setSelectedMedicine(medicine);
          setCurrentView("medicine-detail");
        }}
        onCartOpen={() => setCurrentView("cart")}
        cartCount={cartItems.length}
      />
    );
  }

  if (currentView === "medicine-detail" && selectedMedicine) {
    return (
      <MedicineDetail
        medicine={selectedMedicine}
        onBack={() => setCurrentView("medicine-list")}
        onAddToCart={(medicine, quantity) => {
          const cartItem: CartItem = {
            id: medicine.id,
            name: medicine.name,
            price: medicine.price,
            quantity,
            prescription: medicine.prescription
          };
          setCartItems(prev => [...prev, cartItem]);
          setCurrentView("medicine-list");
        }}
      />
    );
  }

  if (currentView === "cart") {
    return (
      <Cart
        onBack={() => setCurrentView("medicine-list")}
        onCheckout={(items, total) => {
          setOrderId(`ORD-${Date.now()}`);
          setOrderTotal(total);
          setCartItems([]);
          setCurrentView("order-confirmation");
        }}
        items={cartItems}
      />
    );
  }

  if (currentView === "order-confirmation") {
    return (
      <OrderConfirmation
        orderId={orderId}
        total={orderTotal}
        onBackToHome={handleBackToDashboard}
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
        <PatientProfile />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        <SOSButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Hello, John
            </h1>
            <p className="text-muted-foreground">How are you feeling today?</p>
          </div>
          <VoiceButton onNavigate={handleVoiceNavigation} />
        </div>

        {activeTab === "home" && (
          <div className="grid grid-cols-2 gap-4">
            {dashboardCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card 
                  key={card.title} 
                  className={`p-6 cursor-pointer hover:shadow-lg transition-all duration-200 ${card.bgColor}`}
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

        {activeTab === "home" && (
          <div className="mt-6">
            <Card className="p-6 bg-gradient-to-r from-primary-light to-accent-light">
              <h3 className="font-semibold text-foreground mb-4 text-lg">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentView("book-appointment")}
                  className="w-full p-4 text-left bg-white/90 hover:bg-white transition-colors rounded-xl shadow-sm"
                >
                  <p className="font-medium text-foreground text-lg">Book New Appointment</p>
                  <p className="text-sm text-muted-foreground">Schedule with available doctors</p>
                </button>
                <button
                  onClick={() => setCurrentView("scan-document")}
                  className="w-full p-4 text-left bg-white/90 hover:bg-white transition-colors rounded-xl shadow-sm"
                >
                  <p className="font-medium text-foreground text-lg">Scan Medical Report</p>
                  <p className="text-sm text-muted-foreground">Upload and digitize your reports</p>
                </button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Appointments</h2>
              <button
                onClick={() => setCurrentView("book-appointment")}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg text-sm"
              >
                Book New
              </button>
            </div>
            
            <Card className="p-4">
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-medium">Dr. Smith - Cardiology</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
                <div className="border-l-4 border-accent pl-4 py-2">
                  <p className="font-medium">Dr. Johnson - General</p>
                  <p className="text-sm text-muted-foreground">Friday, 2:00 PM</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Medical Reports</h2>
              <button
                onClick={() => setCurrentView("scan-document")}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg text-sm font-medium"
              >
                Scan New
              </button>
            </div>
            
            <Card className="p-6 bg-accent-light">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-3 bg-white/80 rounded-r-lg">
                  <p className="font-medium text-foreground">Blood Test Results</p>
                  <p className="text-sm text-muted-foreground">Jan 15, 2024 • New</p>
                </div>
                <div className="border-l-4 border-accent pl-4 py-3 bg-white/80 rounded-r-lg">
                  <p className="font-medium text-foreground">Chest X-Ray Report</p>
                  <p className="text-sm text-muted-foreground">Jan 10, 2024</p>
                </div>
                <button
                  onClick={() => setCurrentView("reports-list")}
                  className="w-full text-center py-3 text-primary font-medium hover:bg-white/50 rounded-lg transition-colors"
                >
                  View All Reports
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <SOSButton />
    </div>
  );
};