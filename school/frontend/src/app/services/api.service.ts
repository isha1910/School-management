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
  teacherCount: number;
  studentCount: number;
}

export interface SchoolClass {
  _id: string;
  name: string;
  grade?: string;
  section?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdmissionApplyPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dob?: string | null;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  previousSchool?: string;
  applyingForClassId?: string | null;
}

export interface AdmissionApplication {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  dob?: string | null;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  previousSchool?: string;
  applyingForClassId?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string | null;
  notes?: string;
  createdAt: string;
}

export interface Subject {
  _id: string;
  name: string;
  code?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeachingAssignment {
  _id: string;
  teacherUserId: any;
  classId: any;
  subjectIds: any[];
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

  resetTeacherPassword(id: string, password: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/teacher/${id}/reset-password`, { password });
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

  // ─── CLASSES (public read, admin manage via same endpoints) ───
  getClasses(): Observable<ApiResponse<SchoolClass[]>> {
    return this.http.get<ApiResponse<SchoolClass[]>>(`${this.apiUrl}/classes`);
  }

  // ─── ADMISSIONS ───
  applyAdmission(payload: AdmissionApplyPayload): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/admissions/apply`, payload);
  }

  getAdmissions(status?: 'pending' | 'approved' | 'rejected'): Observable<ApiResponse<AdmissionApplication[]>> {
    const url = status ? `${this.apiUrl}/admissions?status=${status}` : `${this.apiUrl}/admissions`;
    return this.http.get<ApiResponse<AdmissionApplication[]>>(url);
  }

  approveAdmission(id: string, classId?: string | null): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/admissions/${id}/approve`, { classId: classId || null });
  }

  rejectAdmission(id: string, notes?: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/admissions/${id}/reject`, { notes: notes || '' });
  }

  // ─── CLASSES (admin manage) ───
  createClass(data: Partial<SchoolClass>): Observable<ApiResponse<SchoolClass>> {
    return this.http.post<ApiResponse<SchoolClass>>(`${this.apiUrl}/classes`, data);
  }
  updateClass(id: string, data: Partial<SchoolClass>): Observable<ApiResponse<SchoolClass>> {
    return this.http.put<ApiResponse<SchoolClass>>(`${this.apiUrl}/classes/${id}`, data);
  }
  deleteClass(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/classes/${id}`);
  }

  // ─── SUBJECTS ───
  getSubjects(): Observable<ApiResponse<Subject[]>> {
    return this.http.get<ApiResponse<Subject[]>>(`${this.apiUrl}/subjects`);
  }
  createSubject(data: Partial<Subject>): Observable<ApiResponse<Subject>> {
    return this.http.post<ApiResponse<Subject>>(`${this.apiUrl}/subjects`, data);
  }
  updateSubject(id: string, data: Partial<Subject>): Observable<ApiResponse<Subject>> {
    return this.http.put<ApiResponse<Subject>>(`${this.apiUrl}/subjects/${id}`, data);
  }
  deleteSubject(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/subjects/${id}`);
  }

  // ─── ASSIGNMENTS ───
  getAssignments(): Observable<ApiResponse<TeachingAssignment[]>> {
    return this.http.get<ApiResponse<TeachingAssignment[]>>(`${this.apiUrl}/assignments`);
  }
  upsertAssignment(payload: { teacherUserId: string; classId: string; subjectIds: string[] }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/assignments`, payload);
  }
  deleteAssignment(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/assignments/${id}`);
  }

  // ─── TEACHER PORTAL ───
  getMyTeachingAssignments(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/teacher/me/assignments`);
  }

  getStudentsForMyClass(classId: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/teacher/me/classes/${classId}/students`);
  }

  // ─── ANNOUNCEMENTS ───
  getAnnouncements(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/announcements`);
  }

  createAnnouncement(payload: { title: string; body: string; audience?: 'all' | 'students' | 'teachers'; pinned?: boolean }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/announcements`, payload);
  }

  updateAnnouncement(id: string, payload: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/announcements/${id}`, payload);
  }

  deleteAnnouncement(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/announcements/${id}`);
  }
}
