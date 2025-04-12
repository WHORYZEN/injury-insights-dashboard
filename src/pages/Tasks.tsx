
import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { recentTasks, taskStats } from "@/data/tasks";
import StatCard from "@/components/dashboard/StatCard";
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  ListChecks,
  Calendar
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Expand task list for the page
const allTasks = [
  ...recentTasks,
  {
    id: "t5",
    title: "Call insurance adjuster about Williams case",
    dueDate: "Apr 19, 2025",
    completed: false,
    caseName: "PI-2025-036",
    caseId: "3",
    estimatedTime: 30,
    assignee: {
      name: "Jordan Parker",
    },
  },
  {
    id: "t6",
    title: "Schedule follow-up with Dr. Martinez",
    dueDate: "Apr 21, 2025",
    completed: false,
    caseName: "PI-2025-042",
    caseId: "1",
    estimatedTime: 15,
    assignee: {
      name: "Alex Turner",
    },
  },
];

const Tasks = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>
            <p className="text-muted-foreground">
              Track and manage all tasks related to your cases.
            </p>
          </div>
          <Button>Create New Task</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Tasks" 
            value={taskStats.total}
            description="All assigned tasks"
            icon={ListChecks}
          />
          <StatCard 
            title="Due Today" 
            value={taskStats.dueToday}
            description="Tasks to complete today"
            icon={Clock}
            variant="accent"
          />
          <StatCard 
            title="Overdue" 
            value={taskStats.overdue}
            description="Past due tasks"
            icon={AlertTriangle}
            variant="destructive"
          />
          <StatCard 
            title="Completed" 
            value={taskStats.completed}
            description="Completed this month"
            icon={CheckSquare}
            variant="primary"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Task List</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {allTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`p-4 flex items-start gap-3 ${task.completed ? 'bg-secondary/50' : ''}`}
                    >
                      <Checkbox checked={task.completed} className="mt-1" />
                      <div className="flex-1">
                        <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </div>
                        
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{task.dueDate}</span>
                          </div>
                          
                          {task.caseName && (
                            <Badge variant="outline" className="text-xs font-normal">
                              {task.caseName}
                            </Badge>
                          )}
                          
                          {task.estimatedTime && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{task.estimatedTime} mins</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground hidden md:inline">
                              {task.assignee.name}
                            </span>
                          </div>
                        )}
                        <Button size="sm" variant="ghost">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
