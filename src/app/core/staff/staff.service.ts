import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../auth/auth.models';
import { StaffMember, StaffPayload } from './staff.models';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/staff';

  listStaff(): Observable<ApiResponse<StaffMember[]>> {
    return this.http.get<ApiResponse<StaffMember[]>>(this.apiUrl, { withCredentials: true });
  }

  createStaff(payload: StaffPayload): Observable<ApiResponse<StaffMember>> {
    return this.http.post<ApiResponse<StaffMember>>(this.apiUrl, payload, { withCredentials: true });
  }

  updateStaff(id: string, payload: StaffPayload): Observable<ApiResponse<StaffMember>> {
    return this.http.put<ApiResponse<StaffMember>>(`${this.apiUrl}/${id}`, payload, { withCredentials: true });
  }
}