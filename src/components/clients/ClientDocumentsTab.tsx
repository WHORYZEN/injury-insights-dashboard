
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Download, Eye, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ClientDocumentsTabProps {
  clientId: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
}

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: "doc1",
    name: "Initial Consultation Notes.pdf",
    type: "PDF",
    size: "1.2 MB",
    uploadedBy: "John Doe",
    uploadedAt: "2025-04-10",
    tags: ["Consultation", "Notes"]
  },
  {
    id: "doc2",
    name: "Medical Records.pdf",
    type: "PDF",
    size: "3.5 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2025-04-08",
    tags: ["Medical", "Evidence"]
  },
  {
    id: "doc3",
    name: "Police Report.docx",
    type: "DOCX",
    size: "843 KB",
    uploadedBy: "Michael Lee",
    uploadedAt: "2025-04-05",
    tags: ["Police", "Report"]
  }
];

const ClientDocumentsTab = ({ clientId }: ClientDocumentsTabProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // In a real app, fetch documents related to the client
    // For now, we'll use mock data
    setDocuments(mockDocuments);
  }, [clientId]);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulating upload delay
    setTimeout(() => {
      toast({
        title: "Upload Complete",
        description: "Your document has been uploaded successfully.",
      });
      setIsUploading(false);
    }, 1500);
  };

  const handleDownload = (docId: string, docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  const handleDelete = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast({
      title: "Document Deleted",
      description: "The document has been removed.",
      variant: "destructive"
    });
  };

  const handleView = (docId: string, docName: string) => {
    toast({
      title: "Viewing Document",
      description: `Opening ${docName}...`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Documents</CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{doc.uploadedAt}</span>
                      <span className="text-xs text-muted-foreground">by {doc.uploadedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleView(doc.id, doc.name)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownload(doc.id, doc.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-lg">No Documents</h3>
            <p className="text-muted-foreground">This client doesn't have any documents yet.</p>
            <Button onClick={handleUpload} className="mt-4" disabled={isUploading}>
              {isUploading ? "Uploading..." : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload First Document
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientDocumentsTab;
