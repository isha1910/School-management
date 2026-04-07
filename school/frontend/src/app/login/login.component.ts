import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: Auth) {}

  login() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res: any) => {
      this.auth.saveUser(res);
      this.auth.redirectDashboard();
    },
    error: (err: any) => {
      alert(err.error.message);
    }
  });
}
}