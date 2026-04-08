import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService, type AdmissionApplyPayload, type SchoolClass } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullName = '';
  email = '';
  phone = '';
  password = '';
  dob = '';
  address = '';
  guardianName = '';
  guardianPhone = '';
  previousSchool = '';
  applyingForClassId: string | null = null;

  classes: SchoolClass[] = [];
  loading = false;
  error = '';
  success = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getClasses().subscribe({
      next: (res) => (this.classes = res.data || []),
      error: () => (this.classes = []),
    });
  }

  register(): void {
    if (!this.fullName || !this.email || !this.password || !this.phone) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const payload: AdmissionApplyPayload = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      dob: this.dob ? this.dob : null,
      address: this.address,
      guardianName: this.guardianName,
      guardianPhone: this.guardianPhone,
      previousSchool: this.previousSchool,
      applyingForClassId: this.applyingForClassId,
    };

    this.api.applyAdmission(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success) {
          this.success = 'Application submitted! Please wait for admin approval. Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Application failed. Please try again.';
      },
    });
  }
}
