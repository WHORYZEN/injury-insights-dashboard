
import React, { useState } from 'react';
import { format } from "date-fns";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, Clock, CheckCircle, Filter } from "lucide-react";
import { lops } from "@/data/lops";

const LOPTracking = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredLOPs = filter 
    ? lops.filter(lop => lop.status === filter) 
    : lops;

  const totalLOPs = lops.length;
  const activeLOPs = lops.filter(lop => lop.status === 'active').length;
  const negotiatingLOPs = lops.filter(lop => lop.status === 'negotiating').length;
  const settledLOPs = lops.filter(lop => lop.status === 'settled' || lop.status === 'paid').length;
  
  const totalAmount = lops.reduce((sum, lop) => sum + lop.amount, 0);
  const settledAmount = lops
    .filter(lop => lop.status === 'settled' || lop.status === 'paid')
    .reduce((sum, lop) => sum + lop.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-blue-500">Active</Badge>;
      case 'negotiating':
        return <Badge variant="default" className="bg-amber-500">Negotiating</Badge>;
      case 'settled':
        return <Badge variant="default" className="bg-green-500">Settled</Badge>;
      case 'paid':
        return <Badge variant="default" className="bg-emerald-700">Paid</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LOP Tracking</h1>
          <p className="text-muted-foreground">
            Manage and track Letters of Protection for your cases
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total LOPs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLOPs}</div>
              <p className="text-xs text-muted-foreground">
                Total value: ${totalAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active LOPs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeLOPs}</div>
              <p className="text-xs text-muted-foreground">
                Requiring attention
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Negotiating</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{negotiatingLOPs}</div>
              <p className="text-xs text-muted-foreground">
                In discussion with providers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Settled</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{settledLOPs}</div>
              <p className="text-xs text-muted-foreground">
                Value: ${settledAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>LOP Records</CardTitle>
            <CardDescription>
              All Letters of Protection for your client cases
            </CardDescription>
            <div className="flex space-x-2 mt-2">
              <Button 
                variant={filter === null ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter(null)}
              >
                All
              </Button>
              <Button 
                variant={filter === 'active' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('active')}
                className="border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Active
              </Button>
              <Button 
                variant={filter === 'negotiating' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('negotiating')}
                className="border-amber-200 hover:bg-amber-50 hover:text-amber-700"
              >
                Negotiating
              </Button>
              <Button 
                variant={filter === 'settled' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('settled')}
                className="border-green-200 hover:bg-green-50 hover:text-green-700"
              >
                Settled
              </Button>
              <Button 
                variant={filter === 'paid' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('paid')}
                className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Paid
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date Issued</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLOPs.map((lop) => (
                  <TableRow key={lop.id}>
                    <TableCell className="font-medium">{lop.caseName}</TableCell>
                    <TableCell>{lop.providerName}</TableCell>
                    <TableCell>{lop.serviceType}</TableCell>
                    <TableCell>${lop.amount.toLocaleString()}</TableCell>
                    <TableCell>{format(new Date(lop.dateIssued), "MMM d, yyyy")}</TableCell>
                    <TableCell>{getStatusBadge(lop.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>
                A list of all LOPs for your cases.
              </TableCaption>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LOPTracking;
