
export type DocumentType = 'Pleading' | 'Medical Record' | 'Correspondence' | 'Discovery' | 'Settlement' | 'Contract' | 'Evidence' | 'Expert Report' | 'Invoice' | 'Other';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  dateCreated: string;
  dateModified: string;
  size: string; // in KB
  author: string;
  relatedTo?: { type: 'Case' | 'Client', id: string, name: string };
  description?: string;
  tags?: string[];
  status?: 'Draft' | 'Final' | 'Pending Review' | 'Archived';
  path?: string;
}

export const documents: Document[] = [
  {
    id: '1',
    name: 'Complaint - Jones vs State Farm.pdf',
    type: 'Pleading',
    dateCreated: '2025-01-15T10:30:00Z',
    dateModified: '2025-01-15T10:30:00Z',
    size: '2,456 KB',
    author: 'John Smith',
    relatedTo: { type: 'Case', id: '1', name: 'Jones vs State Farm' },
    description: 'Initial complaint filing for Jones case',
    tags: ['initial filing', 'complaint'],
    status: 'Final',
    path: '/documents/cases/jones/complaint.pdf'
  },
  {
    id: '2',
    name: 'Jones - MRI Report.pdf',
    type: 'Medical Record',
    dateCreated: '2025-02-10T14:45:00Z',
    dateModified: '2025-02-10T14:45:00Z',
    size: '5,231 KB',
    author: 'Dr. Sarah Johnson',
    relatedTo: { type: 'Client', id: '1', name: 'Robert Jones' },
    description: 'MRI results showing L4-L5 disc herniation',
    tags: ['medical', 'imaging'],
    status: 'Final',
    path: '/documents/clients/jones/medical/mri.pdf'
  },
  {
    id: '3',
    name: 'Settlement Offer - State Farm.pdf',
    type: 'Settlement',
    dateCreated: '2025-04-10T09:30:00Z',
    dateModified: '2025-04-10T09:30:00Z',
    size: '895 KB',
    author: 'Michael Wilson',
    relatedTo: { type: 'Case', id: '1', name: 'Jones vs State Farm' },
    description: 'Initial settlement offer from State Farm',
    tags: ['settlement', 'offer'],
    status: 'Final',
    path: '/documents/cases/jones/settlement/initial_offer.pdf'
  },
  {
    id: '4',
    name: 'Witness Statement - Emma Rodriguez.docx',
    type: 'Evidence',
    dateCreated: '2025-03-05T11:20:00Z',
    dateModified: '2025-03-08T16:45:00Z',
    size: '1,250 KB',
    author: 'Jane Doe',
    relatedTo: { type: 'Case', id: '1', name: 'Jones vs State Farm' },
    description: 'Statement from eyewitness Emma Rodriguez',
    tags: ['witness', 'statement'],
    status: 'Final',
    path: '/documents/cases/jones/evidence/rodriguez_statement.docx'
  },
  {
    id: '5',
    name: 'Accident Reconstruction Report.pdf',
    type: 'Expert Report',
    dateCreated: '2025-03-15T13:10:00Z',
    dateModified: '2025-03-18T10:25:00Z',
    size: '8,632 KB',
    author: 'David Thompson',
    relatedTo: { type: 'Case', id: '2', name: 'Smith vs Progressive' },
    description: 'Expert analysis of accident scene and dynamics',
    tags: ['expert', 'accident'],
    status: 'Final',
    path: '/documents/cases/smith/reports/accident_reconstruction.pdf'
  },
  {
    id: '6',
    name: 'Garcia - Medical Bills Summary.xlsx',
    type: 'Invoice',
    dateCreated: '2025-04-01T09:15:00Z',
    dateModified: '2025-04-05T14:30:00Z',
    size: '1,875 KB',
    author: 'Maria Garcia',
    relatedTo: { type: 'Client', id: '2', name: 'Maria Garcia' },
    description: 'Summary of all medical expenses for Garcia case',
    tags: ['medical', 'expenses', 'billing'],
    status: 'Pending Review',
    path: '/documents/clients/garcia/billing/medical_summary.xlsx'
  }
];
