import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Teacher {
  _id: string;
  name: string;
  subject: string;
  experience: number;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
}

export interface StatsData {
  totalUsers: number;
  totalTeachers: number;
  adminCount: number;
  userCount: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ─── TEACHERS ───

  getTeachers(): Observable<ApiResponse<Teacher[]>> {
    return this.http.get<ApiResponse<Teacher[]>>(`${this.apiUrl}/teacher`);
  }

  getTeacher(id: string): Observable<ApiResponse<Teacher>> {
    return this.http.get<ApiResponse<Teacher>>(`${this.apiUrl}/teacher/${id}`);
  }

  createTeacher(data: Partial<Teacher>): Observable<ApiResponse<Teacher>> {
    return this.http.post<ApiResponse<Teacher>>(`${this.apiUrl}/teacher`, data);
  }

  updateTeacher(id: string, data: Partial<Teacher>): Observable<ApiResponse<Teacher>> {
    return this.http.put<ApiResponse<Teacher>>(`${this.apiUrl}/teacher/${id}`, data);
  }

  deleteTeacher(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/teacher/${id}`);
  }

  // ─── USERS (ADMIN) ───

  getUsers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/users`);
  }

  updateUser(id: string, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/users/${id}`, data);
  }

  deleteUser(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/users/${id}`);
  }

  // ─── DASHBOARD STATS ───

  getDashboardStats(): Observable<ApiResponse<StatsData>> {
    return this.http.get<ApiResponse<StatsData>>(`${this.apiUrl}/users/stats`);
  }
}
