
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { recentClients, Client } from "@/data/clients";
import { recentCases } from "@/data/cases";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClientCasesTab from "@/components/clients/ClientCasesTab";
import ClientDocumentsTab from "@/components/clients/ClientDocumentsTab";
import ClientNotesTab from "@/components/clients/ClientNotesTab";
import ClientActivityTab from "@/components/clients/ClientActivityTab";
import { Phone, Mail, Edit, Save, ArrowLeft } from "lucide-react";
import ClientDeleteDialog from "@/components/clients/ClientDeleteDialog";
import ClientMergeDialog from "@/components/clients/ClientMergeDialog";
import ClientDataExportDialog from "@/components/clients/ClientDataExportDialog";

const ClientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching client data
    const foundClient = recentClients.find(c => c.id === id);
    if (foundClient) {
      setClient(foundClient);
      setEditedClient(JSON.parse(JSON.stringify(foundClient)));
    }
    setIsLoading(false);
  }, [id]);

  const handleInputChange = (field: keyof Client, value: string) => {
    if (!editedClient) return;
    
    setEditedClient({
      ...editedClient,
      [field]: value,
      contactInfo: field === 'email' || field === 'phone' 
        ? { 
            ...editedClient.contactInfo, 
            [field]: value 
          } 
        : editedClient.contactInfo
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9\-\+\(\)\s]{10,15}$/.test(phone);
  };

  const handleSave = () => {
    if (!editedClient) return;

    // Validate email and phone
    if (editedClient.contactInfo?.email && !validateEmail(editedClient.contactInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (editedClient.contactInfo?.phone && !validatePhone(editedClient.contactInfo.phone)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setClient(editedClient);
    setEditMode(false);
    toast({
      title: "Client Updated",
      description: "Client information has been updated successfully"
    });
  };

  const handleBack = () => {
    navigate("/clients");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground">Loading client information...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!client) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-lg font-semibold">Client Not Found</p>
            <p className="text-muted-foreground">The client you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleBack} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Clients
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Button>
          <div className="flex items-center gap-2">
            {!editMode ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditMode(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Client
                </Button>
                <ClientMergeDialog clientId={client.id} clientName={client.name} />
                <ClientDataExportDialog clientId={client.id} clientName={client.name} />
                <ClientDeleteDialog clientId={client.id} clientName={client.name} onDelete={() => navigate("/clients")} />
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setEditMode(false);
                    setEditedClient(JSON.parse(JSON.stringify(client)));
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Client Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                
                {editMode ? (
                  <div className="w-full space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={editedClient?.name || ''} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={editedClient?.contactInfo?.email || ''} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={editedClient?.contactInfo?.phone || ''} 
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center md:text-left w-full">
                    <h2 className="text-2xl font-bold">{client.name}</h2>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{client.contactInfo?.email || "No email provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{client.contactInfo?.phone || "No phone provided"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Client Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client Since</span>
                    <span>{client.since}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Cases</span>
                    <Badge variant="outline">{client.caseCount}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="cases" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="cases">Cases</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cases" className="mt-4">
                <ClientCasesTab clientId={client.id} />
              </TabsContent>
              
              <TabsContent value="documents" className="mt-4">
                <ClientDocumentsTab clientId={client.id} />
              </TabsContent>
              
              <TabsContent value="notes" className="mt-4">
                <ClientNotesTab clientId={client.id} />
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <ClientActivityTab clientId={client.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientProfile;
