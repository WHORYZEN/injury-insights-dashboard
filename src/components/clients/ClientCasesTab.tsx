
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recentCases, Case } from "@/data/cases";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Eye } from "lucide-react";

interface ClientCasesTabProps {
  clientId: string;
}

const ClientCasesTab = ({ clientId }: ClientCasesTabProps) => {
  const navigate = useNavigate();
  const [clientCases, setClientCases] = useState<Case[]>([]);

  useEffect(() => {
    // Filter cases by client ID
    const filteredCases = recentCases.filter(c => c.client.id === clientId);
    setClientCases(filteredCases);
  }, [clientId]);

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
      case "Discovery":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Pending":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "Settlement":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "Closed":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      default:
        return "";
    }
  };

  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  const handleAddCase = () => {
    navigate(`/cases/new?clientId=${clientId}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Client Cases</CardTitle>
        <Button onClick={handleAddCase}>
          <Plus className="mr-2 h-4 w-4" />
          Add Case
        </Button>
      </CardHeader>
      <CardContent>
        {clientCases.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                  <TableCell>{caseItem.type}</TableCell>
                  <TableCell>
                    <Badge className={`${getBadgeVariant(caseItem.status)} font-normal`}>
                      {caseItem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{caseItem.lastActivity.date}</span>
                      <span className="text-sm">{caseItem.lastActivity.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewCase(caseItem.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-lg">No Cases Yet</h3>
            <p className="text-muted-foreground">This client doesn't have any cases yet.</p>
            <Button onClick={handleAddCase} className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add First Case
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientCasesTab;
