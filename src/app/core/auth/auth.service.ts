import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse, AuthResponse, LoginPayload, RegisterPayload, UserProfile } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/auth';
  readonly currentUser = signal<UserProfile | null>(null);

  login(payload: LoginPayload): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, payload, { withCredentials: true })
      .pipe(tap((response) => this.currentUser.set(response.data.user)));
  }

  register(payload: RegisterPayload): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, payload, { withCredentials: true })
      .pipe(tap((response) => this.currentUser.set(response.data.user)));
  }

  refreshSession(): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
      .pipe(tap((response) => this.currentUser.set(response.data.user)));
  }

  loadCurrentUser(): Observable<ApiResponse<UserProfile>> {
    return this.http
      .get<ApiResponse<UserProfile>>(`${this.apiUrl}/me`, { withCredentials: true })
      .pipe(tap((response) => this.currentUser.set(response.data)));
  }

  logout(): Observable<ApiResponse<void>> {
    return this.http
      .post<ApiResponse<void>>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.currentUser.set(null)));
  }
}