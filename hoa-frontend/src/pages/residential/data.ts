import { PaymentDue, FacilityBooking, IssueReport, Document } from './types';

export const residentPaymentDues: PaymentDue[] = [
  {
    id: "1",
    description: "Monthly HOA Dues - March 2024",
    amount: 285.00,
    dueDate: "2024-03-01",
    status: "paid",
    category: "monthly_dues",
    paymentMethod: "Credit Card",
    paidDate: "2024-02-28"
  },
  {
    id: "2",
    description: "Monthly HOA Dues - April 2024",
    amount: 285.00,
    dueDate: "2024-04-01",
    status: "pending",
    category: "monthly_dues"
  },
  {
    id: "3",
    description: "Pool Maintenance Special Assessment",
    amount: 150.00,
    dueDate: "2024-04-15",
    status: "pending",
    category: "special_assessment"
  }
];

export const facilityBookings: FacilityBooking[] = [
  {
    id: "1",
    facilityName: "Clubhouse Main Hall",
    bookingDate: "2024-04-20",
    startTime: "14:00",
    endTime: "18:00",
    status: "confirmed",
    purpose: "Birthday Party",
    notes: "Need tables and chairs setup",
    createdDate: "2024-03-15"
  },
  {
    id: "2",
    facilityName: "Tennis Court A",
    bookingDate: "2024-04-05",
    startTime: "09:00",
    endTime: "11:00",
    status: "pending",
    purpose: "Tennis Practice",
    createdDate: "2024-03-20"
  }
];

export const issueReports: IssueReport[] = [
  {
    id: "1",
    title: "Broken Pool Light",
    description: "The underwater light in the shallow end of the pool is not working",
    category: "maintenance",
    priority: "medium",
    status: "in_progress",
    location: "Community Pool",
    reportedDate: "2024-03-18",
    assignedTo: "Maintenance Team",
    responses: [
      {
        id: "r1",
        message: "Thank you for reporting this. We have scheduled an inspection for tomorrow.",
        author: "Admin",
        role: "admin",
        timestamp: "2024-03-18T10:30:00Z"
      },
      {
        id: "r2",
        message: "Light has been inspected. We need to order a replacement part. ETA 3-5 business days.",
        author: "Maintenance Team",
        role: "maintenance",
        timestamp: "2024-03-19T14:15:00Z"
      }
    ]
  },
  {
    id: "2",
    title: "Parking Violation",
    description: "Car parked in visitor spot overnight for 3 days",
    category: "parking",
    priority: "low",
    status: "resolved",
    location: "Building A Parking Lot",
    reportedDate: "2024-03-10",
    updatedDate: "2024-03-12",
    responses: [
      {
        id: "r3",
        message: "We have contacted the vehicle owner and issued a warning notice.",
        author: "Security",
        role: "admin",
        timestamp: "2024-03-11T09:00:00Z"
      },
      {
        id: "r4",
        message: "Vehicle has been moved. Issue resolved.",
        author: "Security",
        role: "admin",
        timestamp: "2024-03-12T16:30:00Z"
      }
    ]
  }
];

export const documents: Document[] = [
  {
    id: "1",
    title: "Community Bylaws 2024",
    category: "bylaws",
    description: "Updated community bylaws and regulations",
    uploadDate: "2024-01-15",
    fileSize: "2.3 MB",
    fileType: "PDF",
    tags: ["bylaws", "rules", "regulations", "2024"]
  },
  {
    id: "2",
    title: "Pool Usage Policy",
    category: "policies",
    description: "Guidelines for community pool usage and safety",
    uploadDate: "2024-02-01",
    fileSize: "1.1 MB",
    fileType: "PDF",
    tags: ["pool", "policy", "safety", "hours"]
  },
  {
    id: "3",
    title: "March 2024 Board Meeting Minutes",
    category: "meeting_minutes",
    description: "Minutes from the monthly board meeting",
    uploadDate: "2024-03-20",
    fileSize: "850 KB",
    fileType: "PDF",
    tags: ["meeting", "board", "march", "minutes"]
  },
  {
    id: "4",
    title: "Maintenance Request Form",
    category: "forms",
    description: "Form for submitting maintenance requests",
    uploadDate: "2024-01-10",
    fileSize: "450 KB",
    fileType: "PDF",
    tags: ["form", "maintenance", "request", "fillable"]
  }
];
