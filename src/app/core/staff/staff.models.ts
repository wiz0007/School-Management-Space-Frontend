export interface StaffMember {
  id: string;
  fullName: string;
  employeeCode: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  joiningDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface StaffPayload {
  fullName: string;
  employeeCode: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  joiningDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}