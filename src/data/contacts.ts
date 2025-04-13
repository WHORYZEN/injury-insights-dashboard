
export type ContactType = 'Client' | 'Opposing Counsel' | 'Witness' | 'Expert' | 'Medical Provider' | 'Insurance Adjuster' | 'Other';

export interface Contact {
  id: string;
  name: string;
  type: ContactType;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  relatedTo?: { type: 'Case' | 'Client', id: string, name: string }[];
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    type: 'Medical Provider',
    email: 'dr.johnson@example.com',
    phone: '(555) 123-4567',
    company: 'City Medical Center',
    address: '123 Health Ave, Los Angeles, CA 90001',
    notes: 'Orthopedic specialist, primary treating physician',
    createdAt: '2025-02-15T10:30:00Z',
    relatedTo: [
      { type: 'Case', id: '1', name: 'Jones vs State Farm' },
      { type: 'Client', id: '1', name: 'Robert Jones' }
    ]
  },
  {
    id: '2',
    name: 'Michael Wilson',
    type: 'Opposing Counsel',
    email: 'mwilson@lawfirm.com',
    phone: '(555) 987-6543',
    company: 'Wilson & Associates',
    address: '456 Legal Blvd, Los Angeles, CA 90002',
    notes: 'Representing defendant in Jones case',
    createdAt: '2025-02-20T14:45:00Z',
    relatedTo: [
      { type: 'Case', id: '1', name: 'Jones vs State Farm' }
    ]
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    type: 'Witness',
    email: 'erodriguez@email.com',
    phone: '(555) 234-5678',
    address: '789 Witness St, Los Angeles, CA 90003',
    notes: 'Eyewitness to the accident',
    createdAt: '2025-02-25T09:15:00Z',
    relatedTo: [
      { type: 'Case', id: '1', name: 'Jones vs State Farm' }
    ]
  },
  {
    id: '4',
    name: 'David Thompson',
    type: 'Expert',
    email: 'dthompson@experts.com',
    phone: '(555) 345-6789',
    company: 'Accident Reconstruction Specialists',
    address: '101 Expert Way, Los Angeles, CA 90004',
    notes: 'Accident reconstruction expert',
    createdAt: '2025-03-01T11:00:00Z',
    relatedTo: [
      { type: 'Case', id: '2', name: 'Smith vs Progressive' }
    ]
  },
  {
    id: '5',
    name: 'Jennifer Clark',
    type: 'Insurance Adjuster',
    email: 'jclark@insurance.com',
    phone: '(555) 456-7890',
    company: 'State Farm Insurance',
    notes: 'Handling Jones claim',
    createdAt: '2025-03-05T13:30:00Z',
    relatedTo: [
      { type: 'Case', id: '1', name: 'Jones vs State Farm' }
    ]
  }
];
