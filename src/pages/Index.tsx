import { useState } from "react";
import  HomePage from "@/components/HomePage";
import { RoleSelection } from "@/components/RoleSelection";
import { LanguageSelection } from "@/components/LanguageSelection";
import { PatientAuth } from "@/components/auth/PatientAuth";
import { DoctorAuth } from "@/components/auth/DoctorAuth";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { DoctorDashboard } from "@/components/dashboard/DoctorDashboard";

type AppState = "home" | "role-selection" | "language-selection" | "patient-auth" | "doctor-auth" | "patient-dashboard" | "doctor-dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [userRole, setUserRole] = useState<"patient" | "doctor" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleHomeLogin = () => {
    setAppState("role-selection");
  };

  const handleHomeSignup = () => {
    setAppState("role-selection");
  };

  const handleRoleSelect = (role: "patient" | "doctor") => {
    setUserRole(role);
    setAppState("language-selection");
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    if (userRole === "patient") {
      setAppState("patient-auth");
    } else if (userRole === "doctor") {
      setAppState("doctor-auth");
    }
  };

  const handleLogin = () => {
    if (userRole === "patient") {
      setAppState("patient-dashboard");
    } else if (userRole === "doctor") {
      setAppState("doctor-dashboard");
    }
  };

  const handleBackToHome = () => {
    setAppState("home");
    setUserRole(null);
    setSelectedLanguage("en");
  };

  const handleBackToRoleSelection = () => {
    setAppState("role-selection");
  };

  const handleBackToLanguageSelection = () => {
    setAppState("language-selection");
  };

  const handleLogout = () => {
    setAppState("home");
    setUserRole(null);
    setSelectedLanguage("en");
  };

  switch (appState) {
    case "home":
      return <HomePage onLogin={handleHomeLogin} onSignup={handleHomeSignup} />;
    
    case "role-selection":
      return <RoleSelection onRoleSelect={handleRoleSelect} onBack={handleBackToHome} />;
    
    case "language-selection":
      return <LanguageSelection onLanguageSelect={handleLanguageSelect} onBack={handleBackToRoleSelection} />;
    
    case "patient-auth":
      return <PatientAuth onLogin={handleLogin} onBack={handleBackToLanguageSelection} />;
    
    case "doctor-auth":
      return <DoctorAuth onLogin={handleLogin} onBack={handleBackToLanguageSelection} />;
    
    case "patient-dashboard":
      return <PatientDashboard onLogout={handleLogout} />;
    
    case "doctor-dashboard":
      return <DoctorDashboard onLogout={handleLogout} />;
    
    default:
      return <HomePage onLogin={handleHomeLogin} onSignup={handleHomeSignup} />;
  }
};

export default Index;
