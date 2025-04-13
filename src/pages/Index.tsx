
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart4, Calendar, Clock, DollarSign, FileText, Users, TrendingUp, AlertCircle, Clock4 } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import CaseTable from "@/components/dashboard/CaseTable";
import ClientList from "@/components/dashboard/ClientList";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import TaskList from "@/components/dashboard/TaskList";
import { recentCases, caseStats } from "@/data/cases";
import { recentClients, clientStats } from "@/data/clients";
import { upcomingEvents } from "@/data/events";
import { recentTasks, taskStats } from "@/data/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, LineChart } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  
  // For demo purposes - show which card was clicked
  const handleCardClick = (destination: string) => {
    navigate(destination);
    toast({
      title: "Navigating to " + destination.replace('/', ''),
      description: "Loading dashboard data...",
      duration: 2000,
    });
  };

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 18500 },
    { month: 'Feb', revenue: 21300 },
    { month: 'Mar', revenue: 23000 },
    { month: 'Apr', revenue: 24500 },
  ];

  const caseTypeData = [
    { name: 'Auto Accident', value: 42 },
    { name: 'Slip and Fall', value: 28 },
    { name: 'Medical Malpractice', value: 15 },
    { name: 'Workplace Injury', value: 10 },
    { name: 'Product Liability', value: 5 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your personal injury cases.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div onClick={() => handleCardClick("/cases")} className="cursor-pointer transition-all hover:scale-105">
            <StatCard 
              title="Total Cases" 
              value={caseStats.total}
              description={`${caseStats.active} active, ${caseStats.settlement} in settlement`}
              icon={FileText}
              trend={{ value: 12, isPositive: true }}
            />
          </div>
          
          <div onClick={() => handleCardClick("/clients")} className="cursor-pointer transition-all hover:scale-105">
            <StatCard 
              title="Active Clients" 
              value={clientStats.active}
              description={`${clientStats.new} new this month`}
              icon={Users}
              variant="primary"
            />
          </div>
          
          <div onClick={() => handleCardClick("/tasks")} className="cursor-pointer transition-all hover:scale-105">
            <StatCard 
              title="Tasks Due" 
              value={taskStats.dueToday}
              description={`${taskStats.overdue} overdue`}
              icon={Clock}
              variant="accent"
              trend={{ value: 5, isPositive: false }}
            />
          </div>
          
          <div onClick={() => handleCardClick("/billing")} className="cursor-pointer transition-all hover:scale-105">
            <StatCard 
              title="Revenue This Month" 
              value="$24,500"
              description="$127,300 YTD"
              icon={DollarSign}
            />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-6">
          <Card className="md:col-span-3 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Monthly Revenue
                </div>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCardClick("/reports")}
              >
                View Reports
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart
                  data={revenueData}
                  index="month"
                  categories={["revenue"]}
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                  colors={["#8b5cf6"]}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">
                <div className="flex items-center gap-2">
                  <BarChart4 className="h-4 w-4 text-primary" />
                  Case Distribution
                </div>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCardClick("/cases")}
              >
                View All Cases
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PieChart
                  data={caseTypeData}
                  index="name"
                  categories={["value"]}
                  valueFormatter={(value) => `${value}%`}
                  colors={["#8b5cf6", "#0ea5e9", "#f97316", "#10b981", "#6366f1"]}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-6">
          <Card className="md:col-span-3 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-md font-medium">Recent Cases</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCardClick("/cases")}
              >View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <CaseTable cases={recentCases} />
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:col-span-3">
            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-md font-medium">Recent Clients</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCardClick("/clients")}
                >View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                <ClientList clients={recentClients} />
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-md font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Upcoming Events
                    <Badge variant="outline" className="ml-2">Today</Badge>
                  </div>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCardClick("/calendar")}
                >Calendar</Button>
              </CardHeader>
              <CardContent>
                <UpcomingEvents events={upcomingEvents} />
              </CardContent>
            </Card>
          </div>
        </div>
          
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-md font-medium">
              <div className="flex items-center gap-2">
                <Clock4 className="h-4 w-4 text-primary" />
                Tasks Due Today
                {taskStats.overdue > 0 && (
                  <Badge variant="destructive">{taskStats.overdue} Overdue</Badge>
                )}
              </div>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCardClick("/tasks")}
            >View All Tasks</Button>
          </CardHeader>
          <CardContent>
            <TaskList tasks={recentTasks} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
