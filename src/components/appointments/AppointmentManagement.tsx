import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, User, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentManagementProps {
  onBack: () => void;
  onJoinCall: (appointmentId: string) => void;
  onAddNotes: (appointmentId: string) => void;
}

interface DoctorAppointment {
  id: string;
  patientName: string;
  patientAge: number;
  date: string;
  time: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  type: "in-person" | "video";
  reason: string;
}

export const AppointmentManagement = ({ onBack, onJoinCall, onAddNotes }: AppointmentManagementProps) => {
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([
    {
      id: "1",
      patientName: "John Doe",
      patientAge: 34,
      date: "Today",
      time: "9:00 AM",
      status: "accepted",
      type: "video",
      reason: "Follow-up consultation"
    },
    {
      id: "2",
      patientName: "Mary Smith",
      patientAge: 28,
      date: "Today",
      time: "10:30 AM",
      status: "pending",
      type: "in-person",
      reason: "Regular checkup"
    },
    {
      id: "3",
      patientName: "Robert Johnson",
      patientAge: 45,
      date: "Tomorrow",
      time: "2:00 PM",
      status: "accepted",
      type: "video",
      reason: "Heart palpitations"
    },
    {
      id: "4",
      patientName: "Alice Brown",
      patientAge: 52,
      date: "Yesterday",
      time: "11:00 AM",
      status: "completed",
      type: "video",
      reason: "Blood pressure check"
    },
  ]);

  const { toast } = useToast();

  const handleAccept = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: "accepted" } : apt
    ));
    toast({
      title: "Appointment Accepted",
      description: "Patient has been notified",
    });
  };

  const handleReject = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
    ));
    toast({
      title: "Appointment Cancelled",
      description: "Patient has been notified",
    });
  };

  const handleComplete = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: "completed" } : apt
    ));
    toast({
      title: "Appointment Completed",
      description: "Status updated successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning text-warning-foreground";
      case "accepted": return "bg-primary text-primary-foreground";
      case "completed": return "bg-success text-success-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const pendingAppointments = appointments.filter(apt => apt.status === "pending");
  const todaysAppointments = appointments.filter(apt => apt.date === "Today");
  const completedAppointments = appointments.filter(apt => apt.status === "completed");

  const AppointmentCard = ({ appointment }: { appointment: DoctorAppointment }) => (
    <Card className="p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
          <p className="text-sm text-muted-foreground">Age: {appointment.patientAge}</p>
        </div>
        <Badge className={getStatusColor(appointment.status)}>
          {appointment.status}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-foreground">
          <Calendar className="h-4 w-4 mr-2 text-primary" />
          {appointment.date}
        </div>
        <div className="flex items-center text-sm text-foreground">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          {appointment.time}
        </div>
        {appointment.type === "video" && (
          <div className="flex items-center text-sm text-accent">
            <Video className="h-4 w-4 mr-2" />
            Video Consultation
          </div>
        )}
        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
      </div>

      <div className="flex gap-2">
        {appointment.status === "pending" && (
          <>
            <Button
              onClick={() => handleAccept(appointment.id)}
              size="sm"
              className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              Accept
            </Button>
            <Button
              onClick={() => handleReject(appointment.id)}
              size="sm"
              variant="outline"
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Reject
            </Button>
          </>
        )}

        {appointment.status === "accepted" && appointment.type === "video" && (
          <Button
            onClick={() => onJoinCall(appointment.id)}
            size="sm"
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Video className="h-4 w-4 mr-2" />
            Join Call
          </Button>
        )}

        {appointment.status === "accepted" && (
          <Button
            onClick={() => handleComplete(appointment.id)}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            Complete
          </Button>
        )}

        {(appointment.status === "completed" || appointment.status === "accepted") && (
          <Button
            onClick={() => onAddNotes(appointment.id)}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2 mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Appointment Management</h1>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({pendingAppointments.length})</TabsTrigger>
          <TabsTrigger value="today">Today ({todaysAppointments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {pendingAppointments.length > 0 ? (
            pendingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No pending appointments</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="today" className="mt-4">
          {todaysAppointments.length > 0 ? (
            todaysAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No appointments today</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {completedAppointments.length > 0 ? (
            completedAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No completed appointments</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};