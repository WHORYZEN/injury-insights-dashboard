
import React, { useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { recentClients, clientStats, Client } from "@/data/clients";
import StatCard from "@/components/dashboard/StatCard";
import { Users, UserPlus, UserCheck, UserMinus } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail } from "lucide-react";
import AddClientDialog from "@/components/dashboard/AddClientDialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(recentClients);
  const navigate = useNavigate();

  const handleAddClient = (newClient: Client) => {
    setClients(prevClients => [newClient, ...prevClients]);
  };

  const handleViewClient = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  const handleViewCases = (clientId: string) => {
    navigate(`/cases?clientId=${clientId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Directory</h1>
          <p className="text-muted-foreground">
            Manage all your personal injury clients in one place.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Clients" 
            value={clientStats.total}
            description="All-time clients"
            icon={Users}
          />
          <StatCard 
            title="New Clients" 
            value={clientStats.new}
            description="Acquired this month"
            icon={UserPlus}
            variant="accent"
          />
          <StatCard 
            title="Active Clients" 
            value={clientStats.active}
            description="With ongoing cases"
            icon={UserCheck}
            variant="primary"
          />
          <StatCard 
            title="Inactive Clients" 
            value={clientStats.inactive}
            description="No active cases"
            icon={UserMinus}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Client List</h2>
            <AddClientDialog onClientAdded={handleAddClient} />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewClient(client.id)}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={client.avatarUrl} />
                        <AvatarFallback>
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{client.name}</CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Badge variant="outline" className="text-xs font-normal">
                            {client.caseCount} {client.caseCount === 1 ? "Case" : "Cases"}
                          </Badge>
                          <span>•</span>
                          <span>Since {client.since}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {client.contactInfo && (
                    <div className="space-y-2 mt-2">
                      {client.contactInfo.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{client.contactInfo.phone}</span>
                        </div>
                      )}
                      {client.contactInfo.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{client.contactInfo.email}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCases(client.id);
                      }}
                    >
                      View Cases
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewClient(client.id);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
