
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { contacts, Contact, ContactType } from "@/data/contacts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Search, Mail, Phone, UserPlus, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const Contacts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? contact.type === filterType : true;
    
    return matchesSearch && matchesType;
  });

  const contactTypes: ContactType[] = ['Client', 'Opposing Counsel', 'Witness', 'Expert', 'Medical Provider', 'Insurance Adjuster', 'Other'];
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getTypeColor = (type: ContactType) => {
    switch(type) {
      case 'Client': return 'bg-green-100 text-green-800';
      case 'Opposing Counsel': return 'bg-red-100 text-red-800';
      case 'Witness': return 'bg-blue-100 text-blue-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      case 'Medical Provider': return 'bg-teal-100 text-teal-800';
      case 'Insurance Adjuster': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContactView = (contact: Contact) => {
    setSelectedContact(contact);
    setContactDialogOpen(true);
  };

  const handleAddContact = () => {
    toast({
      title: "Add Contact",
      description: "This would open a form to add a new contact.",
      duration: 3000,
    });
  };

  const handleEditContact = () => {
    toast({
      title: "Edit Contact",
      description: `You would edit ${selectedContact?.name}'s information here.`,
      duration: 3000,
    });
    setContactDialogOpen(false);
  };

  const handleDeleteContact = () => {
    toast({
      description: `Contact ${selectedContact?.name} would be deleted.`,
      variant: "destructive",
      duration: 3000,
    });
    setContactDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-muted-foreground">
              Manage your contacts and view their information
            </p>
          </div>
          <Button onClick={handleAddContact}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/contacts?type=all")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Tap to view all</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/contacts?type=Client")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.type === 'Client').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Tap to filter by clients</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/contacts?type=Medical+Provider")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Medical Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.type === 'Medical Provider').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Tap to filter by providers</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/contacts?type=Opposing+Counsel")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Opposing Counsel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.type === 'Opposing Counsel').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Tap to filter by opposing counsel</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Contacts Directory</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-9 w-9" 
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="w-full md:w-48 flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All types</SelectItem>
                    {contactTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-card hover:bg-accent/10"
                    onClick={() => handleContactView(contact)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 bg-primary/10">
                        <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(contact.type)}`}>
                            {contact.type}
                          </span>
                        </div>
                        {contact.company && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">{contact.company}</p>
                        )}
                        <div className="flex flex-col gap-1 mt-2">
                          <a href={`mailto:${contact.email}`} className="text-sm flex items-center text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                            <Mail className="h-3.5 w-3.5 mr-1" />
                            {contact.email}
                          </a>
                          <a href={`tel:${contact.phone}`} className="text-sm flex items-center text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                            <Phone className="h-3.5 w-3.5 mr-1" />
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
                  <Search className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">No contacts found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Details Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              View and manage contact information
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="related">Related Items</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 bg-primary/10">
                    <AvatarFallback>{getInitials(selectedContact.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{selectedContact.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getTypeColor(selectedContact.type)}`}>
                      {selectedContact.type}
                    </span>
                    {selectedContact.company && (
                      <p className="text-muted-foreground mt-1">{selectedContact.company}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span id="email">{selectedContact.email}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone</Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span id="phone">{selectedContact.phone}</span>
                    </div>
                  </div>
                  
                  {selectedContact.address && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">Address</Label>
                      <div id="address" className="col-span-3">
                        {selectedContact.address}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="created" className="text-right">Created</Label>
                    <div id="created" className="col-span-3 text-sm text-muted-foreground">
                      {new Date(selectedContact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="related" className="space-y-4 mt-4">
                {selectedContact.relatedTo ? (
                  <div className="space-y-4">
                    <h3 className="font-medium">Related Items</h3>
                    <div className="grid gap-2">
                      {selectedContact.relatedTo.map((item, index) => (
                        <div key={index} className="p-2 border rounded-md flex justify-between items-center">
                          <div>
                            <Badge variant="outline">{item.type}</Badge>
                            <span className="ml-2">{item.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => {
                            toast({
                              title: "View Related Item",
                              description: `Navigating to ${item.type}: ${item.name}`,
                              duration: 2000,
                            });
                          }}>
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No related items found</p>
                    <Button className="mt-4" variant="outline" onClick={() => {
                      toast({
                        title: "Add Relation",
                        description: "This would open a form to add a new relationship",
                        duration: 2000,
                      });
                    }}>
                      Add Relation
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-4 mt-4">
                {selectedContact.notes ? (
                  <div>
                    <h3 className="font-medium mb-2">Notes</h3>
                    <div className="p-3 border rounded-md bg-muted/30">
                      {selectedContact.notes}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No notes available</p>
                    <Button className="mt-4" variant="outline" onClick={() => {
                      toast({
                        title: "Add Note",
                        description: "This would open a form to add notes",
                        duration: 2000,
                      });
                    }}>
                      Add Note
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDeleteContact}
            >
              Delete Contact
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setContactDialogOpen(false)}
              >
                Close
              </Button>
              <Button onClick={handleEditContact}>
                Edit Contact
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Contacts;
