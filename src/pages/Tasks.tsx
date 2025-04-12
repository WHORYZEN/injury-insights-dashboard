
import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { tasks } from "@/data/tasks";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Plus, AlertCircle } from "lucide-react";
import TaskList from "@/components/dashboard/TaskList";

// Define the priority and status badges for tasks
const getPriorityBadge = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return <Badge variant="accent">High</Badge>;
    case 'medium':
      return <Badge variant="secondary">Medium</Badge>;
    case 'low':
      return <Badge variant="default">Low</Badge>;
    default:
      return <Badge variant="default">Low</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <Badge variant="primary"><CheckCircle2 className="mr-1 h-3 w-3" /> Completed</Badge>;
    case 'in progress':
      return <Badge variant="secondary">In Progress</Badge>;
    case 'pending':
      return <Badge variant="default">Pending</Badge>;
    case 'overdue':
      return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
    default:
      return <Badge variant="default">Pending</Badge>;
  }
};

// Calculate task metrics
const calculateTaskStats = () => {
  const completed = tasks.filter(task => task.status.toLowerCase() === 'completed').length;
  const inProgress = tasks.filter(task => task.status.toLowerCase() === 'in progress').length;
  const pending = tasks.filter(task => task.status.toLowerCase() === 'pending').length;
  const overdue = tasks.filter(task => task.status.toLowerCase() === 'overdue').length;
  const total = tasks.length;
  
  return { completed, inProgress, pending, overdue, total };
};

const Tasks = () => {
  const taskStats = calculateTaskStats();
  
  const today = new Date();
  const todayTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate.toDateString() === today.toDateString();
  });

  const priorityTasks = tasks.filter(task => 
    task.priority.toLowerCase() === 'high' && task.status.toLowerCase() !== 'completed'
  );
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
            <p className="text-muted-foreground">
              Manage and track your case-related tasks.
            </p>
          </div>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            New Task
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskStats.total}</div>
              <p className="text-xs text-muted-foreground">All assigned tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{taskStats.completed}</div>
              <p className="text-xs text-muted-foreground">Tasks finished successfully</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{taskStats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Tasks currently in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{taskStats.overdue}</div>
              <p className="text-xs text-muted-foreground">Tasks past due date</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="today">Due Today</TabsTrigger>
            <TabsTrigger value="priority">High Priority</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <TaskList tasks={tasks} />
          </TabsContent>
          <TabsContent value="today" className="mt-4">
            <TaskList tasks={todayTasks} />
          </TabsContent>
          <TabsContent value="priority" className="mt-4">
            <TaskList tasks={priorityTasks} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
