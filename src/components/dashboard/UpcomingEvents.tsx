
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/data/events";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Events</CardTitle>
        <Button variant="outline" size="sm">View Calendar</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-3 rounded-lg border">
              <div className="flex justify-between">
                <div className="font-medium">{event.title}</div>
                <Badge 
                  variant="outline" 
                  className={`${event.priority === 'High' 
                    ? 'border-red-200 bg-red-50 text-red-700' 
                    : event.priority === 'Medium' 
                      ? 'border-amber-200 bg-amber-50 text-amber-700' 
                      : 'border-blue-200 bg-blue-50 text-blue-700'} text-xs font-normal`}
                >
                  {event.priority}
                </Badge>
              </div>
              
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{event.time}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{event.related}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
