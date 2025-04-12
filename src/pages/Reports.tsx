
import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  DownloadCloud, 
  Calendar, 
  BarChart4, 
  PieChart as PieChartIcon,
  LineChart as LineChartIcon 
} from "lucide-react";

// Mock data for charts
const caseTypeData = [
  { name: 'Auto Accident', value: 42 },
  { name: 'Slip and Fall', value: 28 },
  { name: 'Medical Malpractice', value: 15 },
  { name: 'Workplace Injury', value: 10 },
  { name: 'Product Liability', value: 5 },
];

const revenueData = [
  { name: 'Jan', revenue: 18500 },
  { name: 'Feb', revenue: 21300 },
  { name: 'Mar', revenue: 23000 },
  { name: 'Apr', revenue: 24500 },
];

const caseStatusData = [
  { name: 'Active', value: 28 },
  { name: 'Settlement', value: 7 },
  { name: 'Closed', value: 7 },
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Track performance and analyze metrics across your practice.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-1" />
              Change Period
            </Button>
            <Button>
              <DownloadCloud className="h-4 w-4 mr-1" />
              Export Reports
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                <div className="flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4 text-primary" />
                  Case Distribution by Type
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
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
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                <div className="flex items-center gap-2">
                  <BarChart4 className="h-4 w-4 text-primary" />
                  Case Status Overview
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <BarChart
                  data={caseStatusData}
                  index="name"
                  categories={["value"]}
                  valueFormatter={(value) => `${value}`}
                  colors={["#8b5cf6"]}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                <div className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4 text-primary" />
                  Monthly Revenue (2025)
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <LineChart
                  data={revenueData}
                  index="name"
                  categories={["revenue"]}
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                  colors={["#8b5cf6"]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
