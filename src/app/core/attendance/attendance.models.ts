export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

export interface AttendanceRosterStudent {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  status: AttendanceStatus;
  remarks: string | null;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  classId: string;
  classDisplayName: string;
  attendanceDate: string;
  status: AttendanceStatus;
  remarks: string | null;
  updatedAt: string;
}

export interface AttendanceEntryPayload {
  studentId: string;
  status: AttendanceStatus;
  remarks: string;
}

export interface AttendanceSavePayload {
  classId: string;
  attendanceDate: string;
  entries: AttendanceEntryPayload[];
}