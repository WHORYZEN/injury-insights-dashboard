
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ClientActivityTabProps {
  clientId: string;
}

interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'viewed' | 'document' | 'case' | 'note';
  description: string;
  timestamp: string;
  user: {
    name: string;
    initials: string;
  };
  metadata?: {
    [key: string]: any;
  };
}

// Mock activity data
const mockActivities: ActivityItem[] = [
  {
    id: "act1",
    type: "created",
    description: "Client profile created",
    timestamp: "2025-04-10T14:30:00Z",
    user: {
      name: "John Doe",
      initials: "JD"
    }
  },
  {
    id: "act2",
    type: "document",
    description: "Uploaded 'Medical Records.pdf'",
    timestamp: "2025-04-08T11:15:00Z",
    user: {
      name: "Sarah Johnson",
      initials: "SJ"
    },
    metadata: {
      documentId: "doc2",
      documentType: "PDF"
    }
  },
  {
    id: "act3",
    type: "case",
    description: "Added to case 'Jones vs. Insurance Co.'",
    timestamp: "2025-04-07T09:45:00Z",
    user: {
      name: "Michael Lee",
      initials: "ML"
    },
    metadata: {
      caseId: "case1",
      caseNumber: "PI-2025-001"
    }
  },
  {
    id: "act4",
    type: "updated",
    description: "Contact information updated",
    timestamp: "2025-04-05T16:20:00Z",
    user: {
      name: "John Doe",
      initials: "JD"
    }
  },
  {
    id: "act5",
    type: "note",
    description: "Added a new note",
    timestamp: "2025-04-03T13:10:00Z",
    user: {
      name: "Sarah Johnson",
      initials: "SJ"
    },
    metadata: {
      noteId: "note1"
    }
  },
  {
    id: "act6",
    type: "viewed",
    description: "Client profile viewed",
    timestamp: "2025-04-01T10:05:00Z",
    user: {
      name: "Michael Lee",
      initials: "ML"
    }
  }
];

const ClientActivityTab = ({ clientId }: ClientActivityTabProps) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch activities related to the client
    // For now, we'll use mock data
    setActivities(mockActivities);
  }, [clientId]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return 'bg-green-100 text-green-800';
      case 'updated':
        return 'bg-blue-100 text-blue-800';
      case 'viewed':
        return 'bg-gray-100 text-gray-800';
      case 'document':
        return 'bg-purple-100 text-purple-800';
      case 'case':
        return 'bg-amber-100 text-amber-800';
      case 'note':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filteredActivities = filter 
    ? activities.filter(a => a.type === filter)
    : activities;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Activity History</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={filter === null ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter(null)}
          >
            All
          </Badge>
          <Badge 
            variant={filter === 'updated' ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter('updated')}
          >
            Updates
          </Badge>
          <Badge 
            variant={filter === 'document' ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter('document')}
          >
            Documents
          </Badge>
          <Badge 
            variant={filter === 'case' ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter('case')}
          >
            Cases
          </Badge>
          <Badge 
            variant={filter === 'note' ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setFilter('note')}
          >
            Notes
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {filteredActivities.length > 0 ? (
          <div className="relative pl-6 border-l space-y-6">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="relative mb-8">
                <div className="absolute -left-10 mt-1.5">
                  <Badge 
                    className={`h-7 w-7 rounded-full flex items-center justify-center p-0 ${getActivityIcon(activity.type)}`}
                  >
                    {activity.type.charAt(0).toUpperCase()}
                  </Badge>
                </div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-medium">{activity.description}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <span>{activity.user.name}</span>
                  <span>•</span>
                  <span>{formatDate(activity.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="font-medium text-lg">No Activity Found</h3>
            <p className="text-muted-foreground">There is no activity history matching your filter.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientActivityTab;
