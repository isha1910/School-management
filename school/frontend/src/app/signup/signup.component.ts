import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  user = {
    name: '',
    email: '',
    password: '',
    role: 'student'
  };

  constructor(private http: HttpClient) {}

  signup() {
    this.http.post('http://localhost:3000/api/auth/signup', this.user)
      .subscribe((res: any) => {
        alert(res.message);
      });
  }
}