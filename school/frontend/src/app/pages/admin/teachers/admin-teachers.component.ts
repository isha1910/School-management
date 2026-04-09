import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Teacher } from '../../../services/api.service';

@Component({
  selector: 'app-admin-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.scss'],
})
export class AdminTeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = true;
  saving = false;
  resetting = false;
  error = '';
  successMsg = '';

  // Modal state
  showModal = false;
  isEdit = false;
  showResetModal = false;
  resetTeacherId = '';
  resetTeacherName = '';
  formData = {
    _id: '',
    name: '',
    subject: '',
    experience: 0,
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  // Search
  searchTerm = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  get filteredTeachers(): Teacher[] {
    if (!this.searchTerm) return this.teachers;
    const term = this.searchTerm.toLowerCase();
    return this.teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.subject.toLowerCase().includes(term) ||
        t.email.toLowerCase().includes(term)
    );
  }

  loadTeachers(): void {
    this.loading = true;
    this.api.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load teachers.';
        this.loading = false;
      },
    });
  }

  openAddModal(): void {
    this.isEdit = false;
    this.formData = { _id: '', name: '', subject: '', experience: 0, email: '', phone: '', password: '', confirmPassword: '' };
    this.showModal = true;
    this.error = '';
  }

  openEditModal(teacher: Teacher): void {
    this.isEdit = true;
    this.formData = { ...(teacher as any), password: '', confirmPassword: '' };
    this.showModal = true;
    this.error = '';
  }

  closeModal(): void {
    this.showModal = false;
  }

  openResetPasswordModal(teacher: Teacher): void {
    this.resetTeacherId = teacher._id;
    this.resetTeacherName = teacher.name;
    this.formData.password = '';
    this.formData.confirmPassword = '';
    this.showResetModal = true;
    this.error = '';
  }

  closeResetModal(): void {
    this.showResetModal = false;
    this.resetTeacherId = '';
    this.resetTeacherName = '';
  }

  saveTeacher(): void {
    const { name, subject, experience, email, phone, password, confirmPassword } = this.formData;
    if (!name || !subject || !email || !phone) {
      this.error = 'All fields are required.';
      return;
    }

    if (!this.isEdit) {
      if (!password || !confirmPassword) {
        this.error = 'Password and confirm password are required.';
        return;
      }
      if (password.length < 6) {
        this.error = 'Password must be at least 6 characters.';
        return;
      }
      if (password !== confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }
    }

    this.saving = true;
    this.error = '';

    const data: any = { name, subject, experience, email, phone };
    if (!this.isEdit) data.password = password;

    const request$ = this.isEdit
      ? this.api.updateTeacher(this.formData._id, data)
      : this.api.createTeacher(data);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.showModal = false;
        this.successMsg = this.isEdit ? 'Teacher updated!' : 'Teacher added!';
        this.loadTeachers();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Operation failed.';
      },
    });
  }

  resetPassword(): void {
    const { password, confirmPassword } = this.formData;
    if (!this.resetTeacherId) return;
    if (!password || !confirmPassword) {
      this.error = 'Password and confirm password are required.';
      return;
    }
    if (password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if (password !== confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.resetting = true;
    this.error = '';
    this.api.resetTeacherPassword(this.resetTeacherId, password).subscribe({
      next: (res) => {
        this.resetting = false;
        this.showResetModal = false;
        this.successMsg = res.message || 'Password reset!';
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.resetting = false;
        this.error = err.error?.message || 'Password reset failed.';
      },
    });
  }

  deleteTeacher(id: string, name: string): void {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    this.api.deleteTeacher(id).subscribe({
      next: () => {
        this.successMsg = 'Teacher deleted!';
        this.loadTeachers();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: () => {
        this.error = 'Failed to delete teacher.';
      },
    });
  }
}
