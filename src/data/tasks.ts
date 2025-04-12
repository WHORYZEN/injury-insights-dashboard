
export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  caseName?: string;
  caseId?: string;
  estimatedTime?: number;
  assignee?: {
    name: string;
    avatar?: string;
  };
}

export const recentTasks: Task[] = [
  {
    id: "t1",
    title: "Review medical records for Sarah Johnson",
    dueDate: "Today",
    completed: false,
    caseName: "PI-2025-042",
    caseId: "1",
    estimatedTime: 45,
    assignee: {
      name: "Alex Turner",
    },
  },
  {
    id: "t2",
    title: "Prepare deposition questions for Chen case",
    dueDate: "Apr 17, 2025",
    completed: false,
    caseName: "PI-2025-039",
    caseId: "2",
    estimatedTime: 60,
    assignee: {
      name: "Morgan Lee",
    },
  },
  {
    id: "t3",
    title: "Draft settlement proposal for Williams",
    dueDate: "Apr 18, 2025",
    completed: false,
    caseName: "PI-2025-036",
    caseId: "3",
    estimatedTime: 90,
    assignee: {
      name: "Alex Turner",
    },
  },
  {
    id: "t4",
    title: "File court documents for Davis case",
    dueDate: "Apr 15, 2025",
    completed: true,
    caseName: "PI-2025-034",
    caseId: "4",
    assignee: {
      name: "Morgan Lee",
    },
  },
];

export const taskStats = {
  total: 28,
  overdue: 2,
  dueToday: 3,
  completed: 19,
  inProgress: 6,
};
