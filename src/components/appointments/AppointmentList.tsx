import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, Video, User } from "lucide-react";

interface AppointmentListProps {
  onBack: () => void;
  onJoinCall: (appointmentId: string) => void;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: "in-person" | "video";
  reason?: string;
}

export const AppointmentList = ({ onBack, onJoinCall }: AppointmentListProps) => {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Smith",
      specialty: "Cardiology",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "upcoming",
      type: "video",
      reason: "Follow-up consultation"
    },
    {
      id: "2",
      doctorName: "Dr. Johnson",
      specialty: "General Medicine",
      date: "Friday",
      time: "2:00 PM",
      status: "upcoming",
      type: "in-person",
      reason: "Regular checkup"
    },
    {
      id: "3",
      doctorName: "Dr. Brown",
      specialty: "Neurology",
      date: "Jan 15, 2024",
      time: "11:00 AM",
      status: "completed",
      type: "video",
      reason: "Headache consultation"
    },
  ]);

  const upcomingAppointments = appointments.filter(apt => apt.status === "upcoming");
  const pastAppointments = appointments.filter(apt => apt.status === "completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-primary text-primary-foreground";
      case "completed": return "bg-success text-success-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{appointment.doctorName}</h3>
          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
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
        {appointment.reason && (
          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
        )}
      </div>

      {appointment.status === "upcoming" && appointment.type === "video" && (
        <Button
          onClick={() => onJoinCall(appointment.id)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Video className="h-4 w-4 mr-2" />
          Join Video Call
        </Button>
      )}
    </Card>
  );

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2 mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming appointments</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          {pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No past appointments</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};