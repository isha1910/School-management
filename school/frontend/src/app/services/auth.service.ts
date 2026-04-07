import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  // ─── AUTH METHODS ───

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUser$.next(res.user as any);
        }
      })
    );
  }

  register(data: { name: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser$.next(null);
    this.router.navigate(['/']);
  }

  // ─── STATE ───

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  getUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  get user(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // ─── REDIRECT ───

  redirectToDashboard(): void {
    if (this.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/user/dashboard']);
    }
  }

  // ─── PRIVATE ───

  private loadUserFromStorage(): void {
    const user = this.getUser();
    if (user) {
      this.currentUser$.next(user);
    }
  }
}
