export interface SchoolClass {
  id: string;
  className: string;
  sectionName: string;
  academicYear: string;
  classTeacherId: string | null;
  classTeacherName: string | null;
  capacity: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface SchoolClassPayload {
  className: string;
  sectionName: string;
  academicYear: string;
  classTeacherId: string | null;
  capacity: number;
  status: 'ACTIVE' | 'INACTIVE';
}