
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  related: string;
  priority: 'High' | 'Medium' | 'Low';
  caseId?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: "e1",
    title: "Medical Examination",
    date: "Apr 15, 2025",
    time: "10:00 AM - 11:30 AM",
    location: "City Medical Center",
    related: "Sarah Johnson (PI-2025-042)",
    priority: "High",
    caseId: "1",
  },
  {
    id: "e2",
    title: "Client Consultation",
    date: "Apr 17, 2025",
    time: "2:00 PM - 3:00 PM",
    location: "Office",
    related: "New Client - David Thompson",
    priority: "Medium",
  },
  {
    id: "e3",
    title: "Deposition",
    date: "Apr 18, 2025",
    time: "9:30 AM - 12:00 PM",
    location: "Johnson & Partners Law Office",
    related: "Michael Chen (PI-2025-039)",
    priority: "High",
    caseId: "2",
  },
  {
    id: "e4",
    title: "Document Review",
    date: "Apr 19, 2025",
    time: "1:00 PM - 3:00 PM",
    related: "Robert Williams (PI-2025-036)",
    priority: "Low",
    caseId: "3",
  },
];
