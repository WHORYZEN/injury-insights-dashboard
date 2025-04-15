import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
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
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  FileText,
  Calendar,
  Download,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";

// Mock billing data
const invoices = [
  {
    id: "INV-2025-001",
    client: "Sarah Johnson",
    case: "PI-2025-042",
    amount: 2500,
    date: "Apr 10, 2025",
    status: "Paid",
    description: "Initial consultation and case setup"
  },
  {
    id: "INV-2025-002",
    client: "Michael Chen",
    case: "PI-2025-039",
    amount: 4800,
    date: "Apr 08, 2025",
    status: "Pending",
    description: "Expert witness fees and deposition preparation"
  },
  {
    id: "INV-2025-003",
    client: "Robert Williams",
    case: "PI-2025-036",
    amount: 3200,
    date: "Apr 05, 2025",
    status: "Paid",
    description: "Settlement negotiation and documentation"
  },
  {
    id: "INV-2025-004",
    client: "Emily Davis",
    case: "PI-2025-034",
    amount: 5500,
    date: "Apr 02, 2025",
    status: "Overdue",
    description: "Expert medical review and report preparation"
  },
  {
    id: "INV-2025-005",
    client: "James Wilson",
    case: "PI-2025-031",
    amount: 1800,
    date: "Mar 28, 2025",
    status: "Paid",
    description: "Final documentation and case closing procedures"
  }
];

// Add mock billable hours data
const billableHours = [
  {
    id: "BH-001",
    caseNumber: "PI-2025-042",
    client: "Sarah Johnson",
    hours: 8.5,
    rate: 250,
    total: 2125,
    periodStart: "Apr 1, 2025",
    periodEnd: "Apr 10, 2025"
  },
  {
    id: "BH-002",
    caseNumber: "PI-2025-039",
    client: "Michael Chen",
    hours: 12.0,
    rate: 250,
    total: 3000,
    periodStart: "Apr 1, 2025",
    periodEnd: "Apr 10, 2025"
  },
  {
    id: "BH-003",
    caseNumber: "PI-2025-036",
    client: "Robert Williams",
    hours: 6.5,
    rate: 250,
    total: 1625,
    periodStart: "Apr 1, 2025",
    periodEnd: "Apr 10, 2025"
  }
];

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Invoices</h1>
          <p className="text-muted-foreground">
            Manage billing, invoices, and payments for all cases.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Revenue This Month" 
            value="$24,500"
            description="$127,300 YTD"
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Outstanding" 
            value="$10,300"
            description="4 pending invoices"
            icon={ArrowUpRight}
            variant="accent"
          />
          <StatCard 
            title="Received" 
            value="$14,200"
            description="7 paid invoices"
            icon={ArrowDownRight}
            variant="primary"
          />
          <StatCard 
            title="Average Invoice" 
            value="$3,500"
            description="Per client case"
            icon={FileText}
          />
        </div>

        {/* Billable Hours Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Billable Hours</h2>
            <Button>Add Time Entry</Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billableHours.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.caseNumber}</TableCell>
                      <TableCell>{entry.client}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {entry.periodStart} - {entry.periodEnd}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {entry.hours}h
                        </div>
                      </TableCell>
                      <TableCell>${entry.rate}/h</TableCell>
                      <TableCell>${entry.total}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent Invoices</h2>
            <Button>Create Invoice</Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.case}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {invoice.date}
                        </div>
                      </TableCell>
                      <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : 
                            'bg-red-100 text-red-700 hover:bg-red-100'}`}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
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

export default Billing;
