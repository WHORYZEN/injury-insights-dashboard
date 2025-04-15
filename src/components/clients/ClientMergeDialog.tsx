
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { recentClients } from "@/data/clients";
import { GitMerge } from "lucide-react";

interface ClientMergeDialogProps {
  clientId: string;
  clientName: string;
}

const ClientMergeDialog = ({ clientId, clientName }: ClientMergeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [isMerging, setIsMerging] = useState(false);

  // Filter out the current client from the merge options
  const mergeOptions = recentClients.filter(client => client.id !== clientId);

  const handleMerge = () => {
    if (!selectedClientId) {
      toast({
        title: "Selection Required",
        description: "Please select a client to merge with.",
        variant: "destructive"
      });
      return;
    }

    setIsMerging(true);
    
    // Get the name of the selected client for the toast message
    const targetClientName = recentClients.find(c => c.id === selectedClientId)?.name || "";
    
    // Simulate a delay for the API call
    setTimeout(() => {
      setIsMerging(false);
      setOpen(false);
      
      toast({
        title: "Clients Merged",
        description: `${clientName} has been merged with ${targetClientName}.`,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <GitMerge className="mr-2 h-4 w-4" />
          Merge Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Merge Client</DialogTitle>
          <DialogDescription>
            Merge {clientName} with another client. This will combine their cases, documents, and other data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Source Client</h3>
            <div className="px-4 py-3 border rounded-md bg-muted/10">
              {clientName}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Target Client</h3>
            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
              <SelectTrigger>
                <SelectValue placeholder="Select client to merge with" />
              </SelectTrigger>
              <SelectContent>
                {mergeOptions.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-500">
            <p className="text-sm">
              <strong>Note:</strong> Merging will combine all data from both clients. 
              This action cannot be undone.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleMerge} disabled={isMerging || !selectedClientId}>
            {isMerging ? "Merging..." : "Merge Clients"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientMergeDialog;
