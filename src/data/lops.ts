
export interface LOP {
  id: string;
  caseId: string;
  caseName: string;
  providerName: string;
  serviceType: string;
  amount: number;
  dateIssued: string;
  status: 'active' | 'negotiating' | 'settled' | 'paid';
}

export const lops: LOP[] = [
  {
    id: "lop-001",
    caseId: "case-001",
    caseName: "Johnson v. ABC Corp",
    providerName: "City Medical Center",
    serviceType: "Emergency Care",
    amount: 12500,
    dateIssued: "2024-02-15",
    status: "active"
  },
  {
    id: "lop-002",
    caseId: "case-002",
    caseName: "Smith v. XYZ Industries",
    providerName: "Orthopedic Specialists",
    serviceType: "Physical Therapy",
    amount: 8750,
    dateIssued: "2024-01-10",
    status: "negotiating"
  },
  {
    id: "lop-003",
    caseId: "case-003",
    caseName: "Williams v. Metro Transit",
    providerName: "Advanced Imaging Center",
    serviceType: "MRI Scans",
    amount: 4200,
    dateIssued: "2024-03-05",
    status: "active"
  },
  {
    id: "lop-004",
    caseId: "case-001",
    caseName: "Johnson v. ABC Corp",
    providerName: "Rehabilitation Center",
    serviceType: "Physical Therapy",
    amount: 6800,
    dateIssued: "2024-02-20",
    status: "settled"
  },
  {
    id: "lop-005",
    caseId: "case-004",
    caseName: "Davis v. Insurance Co",
    providerName: "Pain Management Clinic",
    serviceType: "Treatment",
    amount: 3500,
    dateIssued: "2024-01-25",
    status: "paid"
  }
];
