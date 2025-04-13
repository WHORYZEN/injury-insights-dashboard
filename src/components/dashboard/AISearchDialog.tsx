
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot, Send, X, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AISearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  type: "user" | "assistant";
  content: string;
}

const AISearchDialog = ({ open, onOpenChange }: AISearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user query to messages
    setMessages(prev => [...prev, { type: "user", content: query.trim() }]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      generateResponse(query.trim());
      setQuery("");
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (userQuery: string) => {
    // This is a simple mock response generator
    // In a real application, this would be connected to an AI service
    
    let response = "";
    
    if (userQuery.toLowerCase().includes("case")) {
      response = "There are 12 active cases in the system. The most recent case is 'Johnson v. ABC Corp' which was updated 2 hours ago.";
    } else if (userQuery.toLowerCase().includes("client")) {
      response = "We have 35 active clients. You have a meeting with Sarah Johnson tomorrow at 2 PM regarding her personal injury case.";
    } else if (userQuery.toLowerCase().includes("settlement") || userQuery.toLowerCase().includes("offer")) {
      response = "The latest settlement offer for the Williams case is $125,000. The client has not yet responded to this offer.";
    } else if (userQuery.toLowerCase().includes("lop") || userQuery.toLowerCase().includes("lien")) {
      response = "There are 5 active LOPs in the system totaling $35,750. The largest LOP is with City Medical Center for $12,500.";
    } else if (userQuery.toLowerCase().includes("deadline") || userQuery.toLowerCase().includes("due")) {
      response = "You have 3 upcoming deadlines: Motion filing for Smith case (tomorrow), Document review for Williams case (Thursday), and Client meeting with Johnson (Friday).";
    } else {
      response = "I'm your AI assistant for InjuryCase. You can ask me about cases, clients, deadlines, settlements, and more. How can I help you today?";
    }
    
    setMessages(prev => [...prev, { type: "assistant", content: response }]);
  };

  const handleReset = () => {
    setMessages([]);
    setQuery("");
  };

  const examples = [
    "Show me my active cases",
    "When is my next client meeting?",
    "Any pending settlement offers?",
    "Summarize LOP amounts",
    "What deadlines do I have this week?"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 h-[600px] max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-semibold">AI Assistant</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <div className="px-4 border-b">
            <TabsList className="h-12">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex-1">
            <div className="flex-1 overflow-auto p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">How can I help you today?</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Ask me anything about your cases, clients, deadlines, or any other information in the system.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about your cases, clients, etc..."
                  className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !query.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
                {messages.length > 0 && (
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handleReset}
                  >
                    Clear
                  </Button>
                )}
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="flex-1 p-0 m-0 data-[state=active]:flex-1">
            <div className="p-6 space-y-4">
              <h3 className="font-medium text-lg">Examples of what you can ask</h3>
              <div className="grid gap-3">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    className="text-left p-3 border rounded-lg hover:bg-muted transition-colors"
                    onClick={() => {
                      setQuery(example);
                      document.querySelector('[value="chat"]')?.dispatchEvent(
                        new MouseEvent("click", { bubbles: true })
                      );
                      setTimeout(() => {
                        if (inputRef.current) {
                          inputRef.current.focus();
                        }
                      }, 100);
                    }}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AISearchDialog;
