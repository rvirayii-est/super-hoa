// Residential dashboard data types and interfaces

export interface PaymentDue {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  category: 'monthly_dues' | 'special_assessment' | 'fine' | 'maintenance_fee' | 'other';
  paymentMethod?: string;
  paidDate?: string;
  notes?: string;
}

export interface FacilityBooking {
  id: string;
  facilityName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  purpose: string;
  notes?: string;
  createdDate: string;
}

export interface IssueReport {
  id: string;
  title: string;
  description: string;
  category: 'maintenance' | 'security' | 'noise' | 'parking' | 'landscaping' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  location: string;
  reportedDate: string;
  updatedDate?: string;
  photos?: string[];
  responses?: IssueResponse[];
  assignedTo?: string;
}

export interface IssueResponse {
  id: string;
  message: string;
  author: string;
  role: 'resident' | 'admin' | 'maintenance';
  timestamp: string;
  isInternal?: boolean;
}

export interface Document {
  id: string;
  title: string;
  category: 'bylaws' | 'policies' | 'meeting_minutes' | 'financial' | 'forms' | 'notices';
  description: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
  tags: string[];
}
