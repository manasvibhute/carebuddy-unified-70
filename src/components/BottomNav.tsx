import { Home, Calendar, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

type TabView = "home" | "appointments" | "reports" | "profile";

interface BottomNavProps {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-colors",
                activeTab === tab.id
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};