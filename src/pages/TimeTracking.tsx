
import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent,  
} from "@/components/ui/card";
import { 
  Clock, 
  DollarSign, 
  Calendar, 
  Play, 
  StopCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock time entries
const timeEntries = [
  {
    id: "t1",
    date: "Apr 12, 2025",
    task: "Client consultation",
    case: "PI-2025-042",
    client: "Sarah Johnson",
    attorney: {
      name: "Alex Turner",
      avatar: null,
    },
    duration: 60,
    billable: true,
    status: "Completed",
  },
  {
    id: "t2",
    date: "Apr 12, 2025",
    task: "Document review",
    case: "PI-2025-039",
    client: "Michael Chen",
    attorney: {
      name: "Morgan Lee",
      avatar: null,
    },
    duration: 120,
    billable: true,
    status: "Completed",
  },
  {
    id: "t3",
    date: "Apr 11, 2025",
    task: "Settlement negotiations",
    case: "PI-2025-036",
    client: "Robert Williams",
    attorney: {
      name: "Alex Turner",
      avatar: null,
    },
    duration: 90,
    billable: true,
    status: "Completed",
  },
  {
    id: "t4",
    date: "Apr 11, 2025",
    task: "Court filing preparation",
    case: "PI-2025-034",
    client: "Emily Davis",
    attorney: {
      name: "Morgan Lee",
      avatar: null,
    },
    duration: 45,
    billable: true,
    status: "Completed",
  },
  {
    id: "t5",
    date: "Apr 10, 2025",
    task: "Research for expert testimony",
    case: "PI-2025-039",
    client: "Michael Chen",
    attorney: {
      name: "Jordan Parker",
      avatar: null,
    },
    duration: 180,
    billable: false,
    status: "In Progress",
  },
];

const TimeTracking = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Time Tracking</h1>
          <p className="text-muted-foreground">
            Track billable hours and monitor time spent on cases.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Hours Today" 
            value="6.5"
            description="Across 4 cases"
            icon={Clock}
          />
          <StatCard 
            title="Weekly Hours" 
            value="32.5"
            description="78% billable"
            icon={Calendar}
            variant="accent"
          />
          <StatCard 
            title="Billable This Month" 
            value="112.0"
            description="$28,000 value"
            icon={DollarSign}
            variant="primary"
          />
          <Card className="flex flex-col justify-center p-6 space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Currently Tracking</div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">Document Review</div>
                <div className="text-sm text-muted-foreground">Michael Chen (PI-2025-039)</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <StopCircle className="h-4 w-4 text-destructive" />
                </Button>
                <Button variant="outline">
                  00:45:12
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent Time Entries</h2>
            <Button>
              <Play className="h-4 w-4 mr-1" />
              Start New Timer
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Case/Client</TableHead>
                    <TableHead>Attorney</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Billable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {entry.date}
                        </div>
                      </TableCell>
                      <TableCell>{entry.task}</TableCell>
                      <TableCell>
                        <div>
                          <div>{entry.case}</div>
                          <div className="text-xs text-muted-foreground">{entry.client}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={entry.attorney.avatar} />
                            <AvatarFallback className="text-xs">
                              {entry.attorney.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{entry.attorney.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${entry.status === 'Completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                                      'bg-blue-100 text-blue-700 hover:bg-blue-100'}`}
                        >
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {entry.billable ? 
                          <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
                            Billable
                          </Badge> : 
                          <Badge variant="outline">Non-billable</Badge>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TimeTracking;
