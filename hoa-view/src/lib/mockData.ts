export interface Property {
  id: string;
  unit: string;
  address: string;
  type: 'house' | 'condo' | 'townhome';
  ownerId: string;
  ownerName: string;
  status: 'active' | 'inactive';
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  role: 'owner' | 'tenant';
  moveInDate: string;
  status: 'active' | 'inactive';
}

export interface Vehicle {
  id: string;
  propertyId: string;
  plate: string;
  make: string;
  model: string;
  color: string;
  status: 'active' | 'pending';
}

export interface Pet {
  id: string;
  propertyId: string;
  name: string;
  species: string;
  breed: string;
  registrationNo: string;
}

export interface Complaint {
  id: string;
  propertyId: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  description: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Payment {
  id: string;
  propertyId: string;
  amount: number;
  method: string;
  reference: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  expiresAt: string;
}

export const mockProperties: Property[] = [
  { id: 'prop-1', unit: 'A-101', address: '123 Main St', type: 'condo', ownerId: '1', ownerName: 'John Smith', status: 'active' },
  { id: 'prop-2', unit: 'A-102', address: '123 Main St', type: 'condo', ownerId: '4', ownerName: 'Emily Brown', status: 'active' },
  { id: 'prop-3', unit: 'B-201', address: '125 Main St', type: 'condo', ownerId: '5', ownerName: 'Robert Wilson', status: 'active' },
];

export const mockMembers: Member[] = [
  { id: '1', name: 'John Smith', email: 'resident@demo.com', phone: '555-0101', propertyId: 'prop-1', role: 'owner', moveInDate: '2023-01-15', status: 'active' },
  { id: '4', name: 'Emily Brown', email: 'emily@example.com', phone: '555-0102', propertyId: 'prop-2', role: 'owner', moveInDate: '2022-06-01', status: 'active' },
  { id: '5', name: 'Robert Wilson', email: 'robert@example.com', phone: '555-0103', propertyId: 'prop-3', role: 'tenant', moveInDate: '2023-03-10', status: 'active' },
];

export const mockVehicles: Vehicle[] = [
  { id: 'v1', propertyId: 'prop-1', plate: 'ABC-123', make: 'Toyota', model: 'Camry', color: 'Blue', status: 'active' },
  { id: 'v2', propertyId: 'prop-1', plate: 'XYZ-789', make: 'Honda', model: 'Civic', color: 'Silver', status: 'active' },
];

export const mockPets: Pet[] = [
  { id: 'p1', propertyId: 'prop-1', name: 'Max', species: 'Dog', breed: 'Golden Retriever', registrationNo: 'PET-001' },
];

export const mockComplaints: Complaint[] = [
  { id: 'c1', propertyId: 'prop-1', category: 'Maintenance', priority: 'high', status: 'in-progress', description: 'AC unit not working properly', createdAt: '2025-09-28' },
  { id: 'c2', propertyId: 'prop-1', category: 'Noise', priority: 'medium', status: 'resolved', description: 'Loud music from neighboring unit', createdAt: '2025-09-15', resolvedAt: '2025-09-20' },
];

export const mockPayments: Payment[] = [
  { id: 'pay1', propertyId: 'prop-1', amount: 250, method: 'Credit Card', reference: 'TXN-2025-001', date: '2025-09-01', status: 'completed' },
  { id: 'pay2', propertyId: 'prop-1', amount: 250, method: 'Bank Transfer', reference: 'TXN-2025-002', date: '2025-08-01', status: 'completed' },
];

export const mockAnnouncements: Announcement[] = [
  { id: 'ann1', title: 'Pool Maintenance Scheduled', body: 'The community pool will be closed for maintenance from Oct 5-7.', publishedAt: '2025-10-01', expiresAt: '2025-10-07' },
  { id: 'ann2', title: 'Annual HOA Meeting', body: 'Join us for the annual HOA meeting on October 15th at 7 PM in the clubhouse.', publishedAt: '2025-09-25', expiresAt: '2025-10-15' },
];
