
export interface Case {
  id: string;
  caseNumber: string;
  client: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  status: 'Active' | 'Discovery' | 'Pending' | 'Settlement' | 'Closed';
  type: string;
  nextEvent: {
    title: string;
    date: string;
  };
  lastActivity: {
    date: string;
    description: string;
  };
}

export const recentCases: Case[] = [
  {
    id: "1",
    caseNumber: "PI-2025-042",
    client: {
      id: "c1",
      name: "Sarah Johnson",
    },
    status: "Active",
    type: "Auto Accident",
    nextEvent: {
      title: "Medical Examination",
      date: "Apr 15, 2025",
    },
    lastActivity: {
      date: "Apr 10, 2025",
      description: "Medical records received",
    },
  },
  {
    id: "2",
    caseNumber: "PI-2025-039",
    client: {
      id: "c2",
      name: "Michael Chen",
    },
    status: "Discovery",
    type: "Slip and Fall",
    nextEvent: {
      title: "Deposition",
      date: "Apr 18, 2025",
    },
    lastActivity: {
      date: "Apr 9, 2025",
      description: "Witness statement filed",
    },
  },
  {
    id: "3",
    caseNumber: "PI-2025-036",
    client: {
      id: "c3",
      name: "Robert Williams",
    },
    status: "Settlement",
    type: "Workplace Injury",
    nextEvent: {
      title: "Settlement Conference",
      date: "Apr 20, 2025",
    },
    lastActivity: {
      date: "Apr 8, 2025",
      description: "Settlement offer received",
    },
  },
  {
    id: "4",
    caseNumber: "PI-2025-034",
    client: {
      id: "c4",
      name: "Emily Davis",
    },
    status: "Pending",
    type: "Medical Malpractice",
    nextEvent: {
      title: "Expert Witness Meeting",
      date: "Apr 22, 2025",
    },
    lastActivity: {
      date: "Apr 7, 2025",
      description: "Expert report submitted",
    },
  },
  {
    id: "5",
    caseNumber: "PI-2025-031",
    client: {
      id: "c5",
      name: "James Wilson",
    },
    status: "Closed",
    type: "Product Liability",
    nextEvent: {
      title: "Final Documentation",
      date: "Apr 25, 2025",
    },
    lastActivity: {
      date: "Apr 5, 2025",
      description: "Case closed - settlement paid",
    },
  },
];

export const caseStats = {
  total: 42,
  active: 28,
  settlement: 7,
  closed: 7,
};
