
import React, { useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Calendar, 
  BarChart4, 
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  UserRound,
  DollarSign,
  FileText,
  Filter,
  Share2
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

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

const casesMonthlyData = [
  { month: 'Jan', new: 8, closed: 5 },
  { month: 'Feb', new: 10, closed: 7 },
  { month: 'Mar', new: 12, closed: 9 },
  { month: 'Apr', new: 9, closed: 8 },
];

const clientSourceData = [
  { name: 'Referral', value: 35 },
  { name: 'Website', value: 25 },
  { name: 'Social Media', value: 20 },
  { name: 'Google Ads', value: 15 },
  { name: 'Other', value: 5 },
];

const timeTrackingData = [
  { name: 'Client Meetings', hours: 45 },
  { name: 'Research', hours: 28 },
  { name: 'Document Preparation', hours: 32 },
  { name: 'Court Appearance', hours: 12 },
  { name: 'Administrative', hours: 18 },
];

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState("30days");
  const [reportTab, setReportTab] = useState("overview");

  const exportReports = () => {
    toast({
      title: "Exporting Reports",
      description: "Your reports are being prepared for download.",
      duration: 3000,
    });
  };

  const shareReports = () => {
    toast({
      title: "Share Reports",
      description: "This would open a dialog to share reports with colleagues.",
      duration: 3000,
    });
  };

  const handleChartClick = (chartType: string, data: any) => {
    toast({
      title: `${chartType} Chart Clicked`,
      description: `You clicked on ${data.name}: ${data.value || data.revenue || data.hours}`,
      duration: 2000,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Track performance and analyze metrics across your practice.
            </p>
          </div>
          <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">Year to Date</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={shareReports}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button onClick={exportReports}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={reportTab} onValueChange={setReportTab}>
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10">
              Overview
            </TabsTrigger>
            <TabsTrigger value="cases" className="data-[state=active]:bg-primary/10">
              Cases
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-primary/10">
              Clients
            </TabsTrigger>
            <TabsTrigger value="financials" className="data-[state=active]:bg-primary/10">
              Financials
            </TabsTrigger>
            <TabsTrigger value="productivity" className="data-[state=active]:bg-primary/10">
              Productivity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    Total Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800">
                      +12% from last month
                    </Badge>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <UserRound className="h-4 w-4 mr-2 text-purple-600" />
                    Active Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800">
                      +5% from last month
                    </Badge>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                    Avg Case Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">167 days</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="bg-red-100 border-red-200 text-red-800">
                      +12 days from last month
                    </Badge>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-orange-600" />
                    Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,500</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800">
                      +6.5% from last month
                    </Badge>
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-md overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <PieChartIcon className="h-4 w-4 text-primary" />
                      Case Distribution by Type
                    </div>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setReportTab("cases")}
                  >
                    Details
                  </Button>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Case Type Distribution", caseTypeData[0])}>
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
              
              <Card className="shadow-md overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <BarChart4 className="h-4 w-4 text-primary" />
                      Case Status Overview
                    </div>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setReportTab("cases")}
                  >
                    Details
                  </Button>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Case Status", caseStatusData[0])}>
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
              
              <Card className="md:col-span-2 shadow-md overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <LineChartIcon className="h-4 w-4 text-primary" />
                      Monthly Revenue (2025)
                    </div>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setReportTab("financials")}
                  >
                    Details
                  </Button>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Monthly Revenue", { name: 'April', revenue: 24500 })}>
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
          </TabsContent>
          
          <TabsContent value="cases" className="space-y-4 mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Case Analytics</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter Options
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Case Type Distribution</CardTitle>
                  <CardDescription>Breakdown of cases by type</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Case Type", caseTypeData[0])}>
                    <PieChart
                      data={caseTypeData}
                      index="name"
                      categories={["value"]}
                      valueFormatter={(value) => `${value}%`}
                      colors={["#8b5cf6", "#0ea5e9", "#f97316", "#10b981", "#6366f1"]}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Auto accidents represent the majority of cases at 42%
                </CardFooter>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Cases Over Time</CardTitle>
                  <CardDescription>New vs. closed cases by month</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Cases Over Time", casesMonthlyData[2])}>
                    <BarChart
                      data={casesMonthlyData}
                      index="month"
                      categories={["new", "closed"]}
                      valueFormatter={(value) => `${value}`}
                      colors={["#8b5cf6", "#94a3b8"]}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  March had the highest number of new cases (12)
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-4 mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Client Analytics</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter Options
              </Button>
            </div>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-medium">Client Acquisition Sources</CardTitle>
                <CardDescription>How clients found your practice</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Client Source", clientSourceData[0])}>
                  <PieChart
                    data={clientSourceData}
                    index="name"
                    categories={["value"]}
                    valueFormatter={(value) => `${value}%`}
                    colors={["#8b5cf6", "#0ea5e9", "#f97316", "#10b981", "#6366f1"]}
                  />
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Referrals continue to be your strongest client acquisition channel
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="financials" className="space-y-4 mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Financial Analytics</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter Options
              </Button>
            </div>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-medium">Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Revenue", revenueData[3])}>
                  <LineChart
                    data={revenueData}
                    index="name"
                    categories={["revenue"]}
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                    colors={["#8b5cf6"]}
                  />
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Revenue has increased by 32% over the last 4 months
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="productivity" className="space-y-4 mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Productivity Analytics</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter Options
              </Button>
            </div>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-medium">Time Tracking by Activity</CardTitle>
                <CardDescription>Hours spent by activity type</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-80 cursor-pointer" onClick={() => handleChartClick("Time Tracking", timeTrackingData[0])}>
                  <BarChart
                    data={timeTrackingData}
                    index="name"
                    categories={["hours"]}
                    valueFormatter={(value) => `${value} hrs`}
                    colors={["#8b5cf6"]}
                  />
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Client meetings represent the largest time investment
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
