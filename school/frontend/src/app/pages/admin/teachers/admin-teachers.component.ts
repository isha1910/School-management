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
  error = '';
  successMsg = '';

  // Modal state
  showModal = false;
  isEdit = false;
  formData = {
    _id: '',
    name: '',
    subject: '',
    experience: 0,
    email: '',
    phone: '',
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
    this.formData = { _id: '', name: '', subject: '', experience: 0, email: '', phone: '' };
    this.showModal = true;
    this.error = '';
  }

  openEditModal(teacher: Teacher): void {
    this.isEdit = true;
    this.formData = { ...teacher };
    this.showModal = true;
    this.error = '';
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveTeacher(): void {
    const { name, subject, experience, email, phone } = this.formData;
    if (!name || !subject || !email || !phone) {
      this.error = 'All fields are required.';
      return;
    }

    this.saving = true;
    this.error = '';

    const data = { name, subject, experience, email, phone };

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
