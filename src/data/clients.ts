
export interface Client {
  id: string;
  name: string;
  avatarUrl?: string;
  caseCount: number;
  since: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

export const recentClients: Client[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    caseCount: 1,
    since: "April 2025",
    contactInfo: {
      phone: "555-123-4567",
      email: "sarah.j@example.com",
    },
  },
  {
    id: "c2",
    name: "Michael Chen",
    caseCount: 1,
    since: "March 2025",
    contactInfo: {
      phone: "555-987-6543",
      email: "m.chen@example.com",
    },
  },
  {
    id: "c3",
    name: "Robert Williams",
    caseCount: 2,
    since: "February 2025",
    contactInfo: {
      phone: "555-456-7890",
      email: "rob.williams@example.com",
    },
  },
  {
    id: "c4",
    name: "Emily Davis",
    caseCount: 1,
    since: "February 2025",
    contactInfo: {
      phone: "555-789-0123",
      email: "e.davis@example.com",
    },
  },
];

export const clientStats = {
  total: 38,
  new: 5,
  active: 31,
  inactive: 2,
};
