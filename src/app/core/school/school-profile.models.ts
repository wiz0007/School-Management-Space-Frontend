export interface SchoolProfile {
  id: string;
  schoolName: string;
  address: string;
  contactEmail: string;
  phone: string;
  academicYear: string;
  principalName: string;
  timezone: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface SchoolProfilePayload {
  schoolName: string;
  address: string;
  contactEmail: string;
  phone: string;
  academicYear: string;
  principalName: string;
  timezone: string;
  status: 'ACTIVE' | 'INACTIVE';
}