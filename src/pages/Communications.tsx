
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { communications, Communication, CommunicationType } from "@/data/communications";
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
  MessageSquare,
  Phone,
  Users,
  Mail,
  FileText,
  MessageCircle,
  Video,
  Search,
  Filter,
  PlusCircle,
} from "lucide-react";
import { format } from "date-fns";

const Communications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [directionFilter, setDirectionFilter] = useState("");

  const filteredCommunications = communications.filter((comm) => {
    const matchesSearch = 
      comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter ? comm.type === typeFilter : true;
    const matchesDirection = directionFilter ? comm.direction === directionFilter : true;
    
    return matchesSearch && matchesType && matchesDirection;
  });

  const getIconForType = (type: CommunicationType) => {
    switch (type) {
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "Phone Call":
        return <Phone className="h-4 w-4" />;
      case "Meeting":
        return <Users className="h-4 w-4" />;
      case "Letter":
        return <FileText className="h-4 w-4" />;
      case "Text Message":
        return <MessageCircle className="h-4 w-4" />;
      case "Video Conference":
        return <Video className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Unread":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Read":
        return "bg-green-100 text-green-800 border-green-200";
      case "Replied":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDirectionBadge = (direction: "Incoming" | "Outgoing") => {
    return direction === "Incoming" ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        Incoming
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Outgoing
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Communications</h1>
            <p className="text-muted-foreground">
              Track all communications with clients, counsel, and other parties
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Communication
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {communications.filter(c => c.status === "Unread").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Incoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {communications.filter(c => c.direction === "Incoming").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outgoing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {communications.filter(c => c.direction === "Outgoing").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Communications Log</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search communications..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Phone Call">Phone Call</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Letter">Letter</SelectItem>
                    <SelectItem value="Text Message">Text Message</SelectItem>
                    <SelectItem value="Video Conference">Video Conference</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={directionFilter} onValueChange={setDirectionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-directions">All Directions</SelectItem>
                    <SelectItem value="Incoming">Incoming</SelectItem>
                    <SelectItem value="Outgoing">Outgoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommunications.map((comm) => (
                  <TableRow key={comm.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center">
                        {getIconForType(comm.type)}
                        <span className="ml-2">{comm.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{comm.subject}</div>
                      {comm.relatedTo && (
                        <div className="text-xs text-muted-foreground">
                          Related to: {comm.relatedTo.type} - {comm.relatedTo.name}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(comm.date), "MMM d, yyyy")}
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(comm.date), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>{getDirectionBadge(comm.direction)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        {comm.participants.map((p) => (
                          <div key={p.id} className="truncate max-w-[150px]">
                            {p.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {comm.status && (
                        <Badge
                          variant="outline"
                          className={getStatusColor(comm.status)}
                        >
                          {comm.status}
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

export default Communications;
