
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { documents, Document, DocumentType } from "@/data/documents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  FilePen,
  FileHeart,
  FileCheck,
  FileClock,
  FileSearch,
  FileUp,
  Search,
  Filter,
  PlusCircle,
} from "lucide-react";
import { format } from "date-fns";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter ? doc.type === typeFilter : true;
    const matchesStatus = statusFilter ? doc.status === statusFilter : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getIconForType = (type: DocumentType) => {
    switch (type) {
      case "Pleading":
        return <FilePen className="h-4 w-4" />;
      case "Medical Record":
        return <FileHeart className="h-4 w-4" />;
      case "Correspondence":
        return <FileText className="h-4 w-4" />;
      case "Discovery":
        return <FileSearch className="h-4 w-4" />;
      case "Settlement":
        return <FileCheck className="h-4 w-4" />;
      case "Expert Report":
        return <FileClock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Final":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending Review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Documents</h1>
            <p className="text-muted-foreground">
              Manage and organize all case and client documents
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.type === "Medical Record").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pleadings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.type === "Pleading").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Settlements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.type === "Settlement").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="Pleading">Pleading</SelectItem>
                    <SelectItem value="Medical Record">Medical Record</SelectItem>
                    <SelectItem value="Correspondence">Correspondence</SelectItem>
                    <SelectItem value="Discovery">Discovery</SelectItem>
                    <SelectItem value="Settlement">Settlement</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Evidence">Evidence</SelectItem>
                    <SelectItem value="Expert Report">Expert Report</SelectItem>
                    <SelectItem value="Invoice">Invoice</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Final">Final</SelectItem>
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Modified</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Related To</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center">
                        {getIconForType(doc.type)}
                        <span className="ml-2 font-medium">{doc.name}</span>
                      </div>
                      {doc.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {doc.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      {formatDate(doc.dateModified)}
                      <div className="text-xs text-muted-foreground">
                        by {doc.author}
                      </div>
                    </TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      {doc.relatedTo && (
                        <div className="text-sm">
                          {doc.relatedTo.type}: {doc.relatedTo.name}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {doc.status && (
                        <Badge
                          variant="outline"
                          className={getStatusColor(doc.status)}
                        >
                          {doc.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
