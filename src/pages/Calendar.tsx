
import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { upcomingEvents } from "@/data/events";
import { Calendar as CalendarIcon, Clock, MapPin, User } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Calendar = () => {
  // Group events by date
  const eventsByDate = upcomingEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof upcomingEvents>);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule and upcoming events.
            </p>
          </div>
          <Button>Add New Event</Button>
        </div>

        <div className="space-y-6">
          {Object.entries(eventsByDate).map(([date, events]) => (
            <div key={date} className="space-y-3">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                {date}
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{event.title}</CardTitle>
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
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{event.related}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                        <Button size="sm" variant="outline" className="flex-1">Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
