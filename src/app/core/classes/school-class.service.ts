import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../auth/auth.models';
import { SchoolClass, SchoolClassPayload } from './school-class.models';

@Injectable({ providedIn: 'root' })
export class SchoolClassService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/classes';

  listClasses(): Observable<ApiResponse<SchoolClass[]>> {
    return this.http.get<ApiResponse<SchoolClass[]>>(this.apiUrl, { withCredentials: true });
  }

  createClass(payload: SchoolClassPayload): Observable<ApiResponse<SchoolClass>> {
    return this.http.post<ApiResponse<SchoolClass>>(this.apiUrl, payload, { withCredentials: true });
  }

  updateClass(id: string, payload: SchoolClassPayload): Observable<ApiResponse<SchoolClass>> {
    return this.http.put<ApiResponse<SchoolClass>>(`${this.apiUrl}/${id}`, payload, { withCredentials: true });
  }
}