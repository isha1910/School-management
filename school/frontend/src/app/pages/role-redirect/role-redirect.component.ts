import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  template: ''
})
export class RoleRedirectComponent {

  constructor(private router: Router, private auth: AuthService) {
    const role = this.auth.getRole();

    if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
    else if (role === 'teacher') {
      this.router.navigate(['/teacher/dashboard']);
    }
    else if (role === 'student') {
      this.router.navigate(['/student/dashboard']);
    }
    else {
      this.router.navigate(['/login']);
    }

  }

}