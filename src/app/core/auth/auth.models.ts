export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  requestId: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STAFF';
  createdAt: string;
}

export interface AuthResponse {
  accessExpiresInSeconds: number;
  refreshExpiresInSeconds: number;
  user: UserProfile;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}