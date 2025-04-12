
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Client } from "@/data/clients";

interface ClientListProps {
  clients: Client[];
}

const ClientList = ({ clients }: ClientListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Clients</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.id} className="flex justify-between items-start p-3 rounded-lg border">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={client.avatarUrl} />
                  <AvatarFallback>
                    {client.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{client.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="text-xs font-normal">
                      {client.caseCount} {client.caseCount === 1 ? "Case" : "Cases"}
                    </Badge>
                    <span>•</span>
                    <span>{client.since}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientList;
