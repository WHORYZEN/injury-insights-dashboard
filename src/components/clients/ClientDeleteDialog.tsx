
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
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface ClientDeleteDialogProps {
  clientId: string;
  clientName: string;
  onDelete: () => void;
}

const ClientDeleteDialog = ({ clientId, clientName, onDelete }: ClientDeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate a delay for the API call
    setTimeout(() => {
      setIsDeleting(false);
      setOpen(false);
      onDelete();
      
      toast({
        title: "Client Deleted",
        description: `${clientName} has been deleted from your clients.`,
        variant: "destructive"
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Client</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {clientName}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 p-4 bg-destructive/10 rounded-md text-destructive border border-destructive/20">
          <p className="text-sm">
            <strong>Warning:</strong> Deleting this client will remove all associated data including case history, documents, notes, and activity logs.
          </p>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Client"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDeleteDialog;
