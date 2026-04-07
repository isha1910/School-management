import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // 🔥 ROLE BASED DASHBOARD
  goToDashboard() {
    const role = this.authService.getRole();

    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } 
    else if (role === 'teacher') {
      this.router.navigate(['/teacher-dashboard']);
    } 
    else {
      this.router.navigate(['/student-dashboard']);
    }
  }
}