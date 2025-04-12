
import { BarChart4, Calendar, Clock, DollarSign, FileText, Users } from "lucide-react";
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

const Index = () => {
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
          <StatCard 
            title="Total Cases" 
            value={caseStats.total}
            description={`${caseStats.active} active, ${caseStats.settlement} in settlement`}
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Active Clients" 
            value={clientStats.active}
            description={`${clientStats.new} new this month`}
            icon={Users}
            variant="primary"
          />
          <StatCard 
            title="Tasks Due" 
            value={taskStats.dueToday}
            description={`${taskStats.overdue} overdue`}
            icon={Clock}
            variant="accent"
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard 
            title="Revenue This Month" 
            value="$24,500"
            description="$127,300 YTD"
            icon={DollarSign}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-6">
          <div className="md:col-span-4 space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Recent Cases</h2>
              <CaseTable cases={recentCases} />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <ClientList clients={recentClients} />
              <UpcomingEvents events={upcomingEvents} />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <TaskList tasks={recentTasks} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
