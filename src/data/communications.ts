
export type CommunicationType = 'Email' | 'Phone Call' | 'Meeting' | 'Letter' | 'Text Message' | 'Video Conference';

export interface Communication {
  id: string;
  type: CommunicationType;
  subject: string;
  date: string;
  direction: 'Incoming' | 'Outgoing';
  participants: {
    id: string;
    name: string;
    type: string;
  }[];
  content: string;
  relatedTo?: { type: 'Case' | 'Client', id: string, name: string };
  attachments?: string[];
  status?: 'Unread' | 'Read' | 'Replied' | 'Archived';
}

export const communications: Communication[] = [
  {
    id: '1',
    type: 'Email',
    subject: 'Settlement Offer',
    date: '2025-04-10T09:30:00Z',
    direction: 'Incoming',
    participants: [
      { id: '2', name: 'Michael Wilson', type: 'Opposing Counsel' }
    ],
    content: 'We would like to offer $75,000 to settle the Jones case. Please review with your client and respond within 7 days.',
    relatedTo: { type: 'Case', id: '1', name: 'Jones vs State Farm' },
    attachments: ['Settlement_Offer.pdf'],
    status: 'Read'
  },
  {
    id: '2',
    type: 'Phone Call',
    subject: 'Medical Records Discussion',
    date: '2025-04-09T14:15:00Z',
    direction: 'Outgoing',
    participants: [
      { id: '1', name: 'Dr. Sarah Johnson', type: 'Medical Provider' }
    ],
    content: 'Called Dr. Johnson to discuss Robert Jones medical reports. She will send updated records by end of week.',
    relatedTo: { type: 'Client', id: '1', name: 'Robert Jones' },
    status: 'Archived'
  },
  {
    id: '3',
    type: 'Meeting',
    subject: 'Case Strategy',
    date: '2025-04-08T11:00:00Z',
    direction: 'Outgoing',
    participants: [
      { id: '101', name: 'Robert Jones', type: 'Client' }
    ],
    content: 'Met with client to discuss case strategy and recent settlement offer. Client wants to counter at $95,000.',
    relatedTo: { type: 'Case', id: '1', name: 'Jones vs State Farm' },
    status: 'Archived'
  },
  {
    id: '4',
    type: 'Text Message',
    subject: 'Appointment Confirmation',
    date: '2025-04-11T10:45:00Z',
    direction: 'Outgoing',
    participants: [
      { id: '102', name: 'Maria Garcia', type: 'Client' }
    ],
    content: 'Confirming your appointment tomorrow at 2:00 PM to review case documents. Please let us know if you need to reschedule.',
    relatedTo: { type: 'Client', id: '2', name: 'Maria Garcia' },
    status: 'Read'
  },
  {
    id: '5',
    type: 'Email',
    subject: 'Deposition Schedule',
    date: '2025-04-12T08:20:00Z',
    direction: 'Incoming',
    participants: [
      { id: '2', name: 'Michael Wilson', type: 'Opposing Counsel' }
    ],
    content: 'We would like to schedule the deposition of witness Emma Rodriguez for next week. Please advise on availability.',
    relatedTo: { type: 'Case', id: '1', name: 'Jones vs State Farm' },
    attachments: ['Deposition_Notice.pdf'],
    status: 'Unread'
  }
];
