import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse, AuthResponse, LoginPayload, RegisterPayload, UserProfile } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/auth';
  private readonly tokenKey = 'schoolsys.accessToken';
  readonly currentUser = signal<UserProfile | null>(null);

  login(payload: LoginPayload): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, payload)
      .pipe(tap((response) => this.persistSession(response.data)));
  }

  register(payload: RegisterPayload): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, payload)
      .pipe(tap((response) => this.persistSession(response.data)));
  }

  loadCurrentUser(): Observable<ApiResponse<UserProfile>> {
    return this.http
      .get<ApiResponse<UserProfile>>(`${this.apiUrl}/me`)
      .pipe(tap((response) => this.currentUser.set(response.data)));
  }

  token(): string | null {
    return globalThis.localStorage?.getItem(this.tokenKey) ?? null;
  }

  logout(): void {
    globalThis.localStorage?.removeItem(this.tokenKey);
    this.currentUser.set(null);
  }

  private persistSession(auth: AuthResponse): void {
    globalThis.localStorage?.setItem(this.tokenKey, auth.accessToken);
    this.currentUser.set(auth.user);
  }

}
