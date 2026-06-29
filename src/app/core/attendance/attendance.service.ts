import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../auth/auth.models';
import { AttendanceRecord, AttendanceRosterStudent, AttendanceSavePayload } from './attendance.models';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/attendance';

  loadRoster(classId: string, attendanceDate: string): Observable<ApiResponse<AttendanceRosterStudent[]>> {
    const params = new HttpParams().set('classId', classId).set('attendanceDate', attendanceDate);
    return this.http.get<ApiResponse<AttendanceRosterStudent[]>>(`${this.apiUrl}/roster`, { params, withCredentials: true });
  }

  loadRecords(classId: string, attendanceDate: string): Observable<ApiResponse<AttendanceRecord[]>> {
    const params = new HttpParams().set('classId', classId).set('attendanceDate', attendanceDate);
    return this.http.get<ApiResponse<AttendanceRecord[]>>(this.apiUrl, { params, withCredentials: true });
  }

  saveAttendance(payload: AttendanceSavePayload): Observable<ApiResponse<AttendanceRecord[]>> {
    return this.http.post<ApiResponse<AttendanceRecord[]>>(this.apiUrl, payload, { withCredentials: true });
  }
}