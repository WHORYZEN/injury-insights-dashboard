
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Save, Edit, Trash2 } from "lucide-react";

interface ClientNotesTabProps {
  clientId: string;
}

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Mock notes data
const mockNotes: Note[] = [
  {
    id: "note1",
    content: "Initial client consultation. Client described accident in detail. Recommended gathering medical records and police report.",
    createdAt: "2025-04-10T14:30:00Z",
    updatedAt: "2025-04-10T14:30:00Z",
    createdBy: "John Doe"
  },
  {
    id: "note2",
    content: "Follow-up call with client regarding medical treatment progress. Client reports seeing physical therapist 3x weekly and improvement in mobility.",
    createdAt: "2025-04-05T10:15:00Z",
    updatedAt: "2025-04-05T10:15:00Z",
    createdBy: "Sarah Johnson"
  }
];

const ClientNotesTab = ({ clientId }: ClientNotesTabProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    // In a real app, fetch notes related to the client
    // For now, we'll use mock data
    setNotes(mockNotes);
  }, [clientId]);

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: "Empty Note",
        description: "Please enter some content for your note.",
        variant: "destructive"
      });
      return;
    }

    const newNoteObj: Note = {
      id: `note${Date.now()}`,
      content: newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Current User" // In a real app, get from auth context
    };

    setNotes([newNoteObj, ...notes]);
    setNewNote("");
    setIsAddingNote(false);
    toast({
      title: "Note Added",
      description: "Your note has been added successfully.",
    });
  };

  const handleStartEditing = (note: Note) => {
    setEditingNoteId(note.id);
    setEditedContent(note.content);
  };

  const handleSaveEdit = (noteId: string) => {
    if (!editedContent.trim()) {
      toast({
        title: "Empty Note",
        description: "Note cannot be empty.",
        variant: "destructive"
      });
      return;
    }

    setNotes(notes.map(note => 
      note.id === noteId 
        ? {
            ...note,
            content: editedContent,
            updatedAt: new Date().toISOString()
          }
        : note
    ));
    
    setEditingNoteId(null);
    toast({
      title: "Note Updated",
      description: "Your note has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditedContent("");
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    toast({
      title: "Note Deleted",
      description: "The note has been removed.",
      variant: "destructive"
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Notes</CardTitle>
        {!isAddingNote && (
          <Button onClick={() => setIsAddingNote(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAddingNote && (
          <div className="mb-6 border rounded-md p-4 bg-muted/10">
            <Textarea
              placeholder="Enter note content..."
              className="min-h-[100px] mb-4"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddNote}>
                Save Note
              </Button>
            </div>
          </div>
        )}

        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="border rounded-md p-4 hover:bg-muted/10">
                {editingNoteId === note.id ? (
                  <div>
                    <Textarea
                      className="min-h-[100px] mb-4"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => handleSaveEdit(note.id)}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="prose max-w-none dark:prose-invert mb-4">
                      <p className="whitespace-pre-line">{note.content}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span>By {note.createdBy} on {formatDate(note.createdAt)}</span>
                        {note.updatedAt !== note.createdAt && (
                          <span> (Edited: {formatDate(note.updatedAt)})</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStartEditing(note)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="font-medium text-lg">No Notes</h3>
            <p className="text-muted-foreground">This client doesn't have any notes yet.</p>
            <Button onClick={() => setIsAddingNote(true)} className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add First Note
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientNotesTab;
