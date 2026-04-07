import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private API = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ LOGIN
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API}/login`, { email, password });
  }

  // ✅ SAVE USER (🔥 FIX)
  saveUser(res: any) {

    console.log("LOGIN RESPONSE:", res);

    // ❗ पहले clear करो (VERY IMPORTANT)
    localStorage.clear();

    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);

    console.log("ROLE SAVED:", res.role);
  }

  // ✅ GET ROLE
  getRole() {
    return localStorage.getItem('role');
  }

  // ✅ GET TOKEN
  getToken() {
    return localStorage.getItem('token');
  }

  // ✅ LOGIN CHECK
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // ✅ LOGOUT
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ✅ 🔥 FINAL REDIRECT FIX
  redirectDashboard() {
    const role = this.getRole();

    console.log("FINAL ROLE:", role);

    if (role === 'teacher') {
      this.router.navigate(['/teacher-dashboard']);
    } 
    else if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } 
    else if (role === 'student') {
      this.router.navigate(['/student-dashboard']);
    } 
    else {
      this.router.navigate(['/login']);
    }
  }
}