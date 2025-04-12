
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Case } from "@/data/cases";

interface CaseTableProps {
  cases: Case[];
}

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

const CaseTable = ({ cases }: CaseTableProps) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Next Event</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((caseItem) => (
            <TableRow key={caseItem.id}>
              <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={caseItem.client.avatarUrl} />
                    <AvatarFallback className="text-xs">
                      {caseItem.client.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{caseItem.client.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${getBadgeVariant(caseItem.status)} font-normal`}>
                  {caseItem.status}
                </Badge>
              </TableCell>
              <TableCell>{caseItem.type}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{caseItem.nextEvent.title}</span>
                  <span className="text-xs text-muted-foreground">{caseItem.nextEvent.date}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{caseItem.lastActivity.date}</span>
                  <span className="text-sm">{caseItem.lastActivity.description}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit Case</DropdownMenuItem>
                      <DropdownMenuItem>Add Document</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Event</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Close Case</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CaseTable;
