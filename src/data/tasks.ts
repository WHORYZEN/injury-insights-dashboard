
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
  status: string;
  priority: string;
}

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Review medical records for Sarah Johnson",
    dueDate: "2025-04-12",
    completed: false,
    caseName: "PI-2025-042",
    caseId: "1",
    estimatedTime: 45,
    assignee: {
      name: "Alex Turner",
    },
    status: "In Progress",
    priority: "High"
  },
  {
    id: "t2",
    title: "Prepare deposition questions for Chen case",
    dueDate: "2025-04-17",
    completed: false,
    caseName: "PI-2025-039",
    caseId: "2",
    estimatedTime: 60,
    assignee: {
      name: "Morgan Lee",
    },
    status: "Pending",
    priority: "Medium"
  },
  {
    id: "t3",
    title: "Draft settlement proposal for Williams",
    dueDate: "2025-04-18",
    completed: false,
    caseName: "PI-2025-036",
    caseId: "3",
    estimatedTime: 90,
    assignee: {
      name: "Alex Turner",
    },
    status: "Pending",
    priority: "Low"
  },
  {
    id: "t4",
    title: "File court documents for Davis case",
    dueDate: "2025-04-15",
    completed: true,
    caseName: "PI-2025-034",
    caseId: "4",
    assignee: {
      name: "Morgan Lee",
    },
    status: "Completed",
    priority: "Medium"
  },
  {
    id: "t5",
    title: "Schedule expert witness for Peterson trial",
    dueDate: "2025-04-12",
    completed: false,
    caseName: "PI-2025-041",
    caseId: "5",
    assignee: {
      name: "Jordan Rivera",
    },
    status: "Pending",
    priority: "High"
  },
  {
    id: "t6",
    title: "Review insurance policy limits for Rodriguez",
    dueDate: "2025-04-14",
    completed: false,
    caseName: "PI-2025-040",
    caseId: "6",
    assignee: {
      name: "Taylor Kim",
    },
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: "t7",
    title: "Submit discovery requests for Thompson case",
    dueDate: "2025-04-11",
    completed: false,
    caseName: "PI-2025-038",
    caseId: "7",
    assignee: {
      name: "Alex Turner",
    },
    status: "Overdue",
    priority: "High"
  },
  {
    id: "t8",
    title: "Follow up with client about settlement offer",
    dueDate: "2025-04-10",
    completed: false,
    caseName: "PI-2025-037",
    caseId: "8",
    assignee: {
      name: "Morgan Lee",
    },
    status: "Overdue",
    priority: "High"
  }
];

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
    status: "In Progress",
    priority: "High"
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
    status: "Pending",
    priority: "Medium"
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
    status: "Pending",
    priority: "Low"
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
    status: "Completed",
    priority: "Medium"
  },
];

export const taskStats = {
  total: 28,
  overdue: 2,
  dueToday: 3,
  completed: 19,
  inProgress: 6,
};
