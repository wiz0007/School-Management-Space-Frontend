import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../auth/auth.models';
import { Student, StudentPayload } from './student.models';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/students';

  listStudents(): Observable<ApiResponse<Student[]>> {
    return this.http.get<ApiResponse<Student[]>>(this.apiUrl, { withCredentials: true });
  }

  createStudent(payload: StudentPayload): Observable<ApiResponse<Student>> {
    return this.http.post<ApiResponse<Student>>(this.apiUrl, payload, { withCredentials: true });
  }
}