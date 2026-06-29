export interface Student {
  id: string;
  fullName: string;
  admissionNumber: string;
  classId: string | null;
  classDisplayName: string | null;
  className: string;
  sectionName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface StudentPayload {
  fullName: string;
  admissionNumber: string;
  classId: string | null;
  className: string;
  sectionName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  status: 'ACTIVE' | 'INACTIVE';
}