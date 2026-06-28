import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../auth/auth.models';
import { SchoolProfile, SchoolProfilePayload } from './school-profile.models';

@Injectable({ providedIn: 'root' })
export class SchoolProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/school/profile';

  loadProfile(): Observable<ApiResponse<SchoolProfile | null>> {
    return this.http.get<ApiResponse<SchoolProfile | null>>(this.apiUrl, { withCredentials: true });
  }

  saveProfile(payload: SchoolProfilePayload): Observable<ApiResponse<SchoolProfile>> {
    return this.http.put<ApiResponse<SchoolProfile>>(this.apiUrl, payload, { withCredentials: true });
  }
}