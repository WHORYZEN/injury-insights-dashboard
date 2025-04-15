
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
import { Download, FileText, FileJson, Table } from "lucide-react";

interface ClientDataExportDialogProps {
  clientId: string;
  clientName: string;
}

const ClientDataExportDialog = ({ clientId, clientName }: ClientDataExportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<string | null>(null);

  const handleExport = (format: string) => {
    setExportFormat(format);
    setIsExporting(true);
    
    // Simulate a delay for the export
    setTimeout(() => {
      setIsExporting(false);
      setOpen(false);
      
      toast({
        title: "Export Complete",
        description: `${clientName}'s data has been exported as ${format.toUpperCase()}.`,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Client Data</DialogTitle>
          <DialogDescription>
            Download {clientName}'s complete data in your preferred format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 hover:bg-muted"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
          >
            <FileText className="h-10 w-10 text-red-600" />
            <span className="font-medium">PDF</span>
            <span className="text-xs text-muted-foreground">Formatted Report</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 hover:bg-muted"
            onClick={() => handleExport('json')}
            disabled={isExporting}
          >
            <FileJson className="h-10 w-10 text-amber-600" />
            <span className="font-medium">JSON</span>
            <span className="text-xs text-muted-foreground">Raw Data</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 hover:bg-muted"
            onClick={() => handleExport('xlsx')}
            disabled={isExporting}
          >
            <Table className="h-10 w-10 text-green-600" />
            <span className="font-medium">XLSX</span>
            <span className="text-xs text-muted-foreground">Excel Spreadsheet</span>
          </Button>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDataExportDialog;
