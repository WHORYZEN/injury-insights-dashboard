
import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { recentCases, caseStats } from "@/data/cases";
import CaseTable from "@/components/dashboard/CaseTable";
import StatCard from "@/components/dashboard/StatCard";
import { FileText, Briefcase, Scale, Clock } from "lucide-react";

const Cases = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Case Management</h1>
          <p className="text-muted-foreground">
            Manage and track all your personal injury cases.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Cases" 
            value={caseStats.total}
            description={`${caseStats.active} active cases`}
            icon={FileText}
          />
          <StatCard 
            title="In Settlement" 
            value={caseStats.settlement}
            description="Cases in settlement phase"
            icon={Scale}
            variant="accent"
          />
          <StatCard 
            title="Closed Cases" 
            value={caseStats.closed}
            description="Successfully closed cases"
            icon={Briefcase}
            variant="primary"
          />
          <StatCard 
            title="Average Resolution" 
            value="4.2 months"
            description="Average case resolution time"
            icon={Clock}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">All Cases</h2>
            <CaseTable cases={recentCases} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cases;
