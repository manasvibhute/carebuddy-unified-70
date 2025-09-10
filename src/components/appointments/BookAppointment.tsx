import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { VoiceInput } from "../voice/VoiceInput";
import { VoiceButton } from "../voice/VoiceButton";

interface BookAppointmentProps {
  onBack: () => void;
}

export const BookAppointment = ({ onBack }: BookAppointmentProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const doctors = [
    { id: "1", name: "Dr. Smith", specialty: "Cardiology" },
    { id: "2", name: "Dr. Johnson", specialty: "General Medicine" },
    { id: "3", name: "Dr. Brown", specialty: "Neurology" },
    { id: "4", name: "Dr. Davis", specialty: "Orthopedics" },
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: "Your appointment has been scheduled successfully",
    });
    onBack();
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="p-2 mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
        </div>
        <VoiceButton />
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <Label htmlFor="doctor">Select Doctor *</Label>
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose a doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-4">
          <Label>Select Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-2",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </Card>

        <Card className="p-4">
          <Label>Select Time *</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className="text-xs"
              >
                <Clock className="h-3 w-3 mr-1" />
                {time}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <Label htmlFor="reason">Reason for Visit</Label>
          <VoiceInput
            value={reason}
            onChange={setReason}
            placeholder="Describe your symptoms or reason for the appointment"
            className="mt-2"
          />
        </Card>

        <Button
          onClick={handleBooking}
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};