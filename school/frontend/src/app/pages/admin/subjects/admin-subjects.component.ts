import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, type Subject } from '../../../services/api.service';

@Component({
  selector: 'app-admin-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.scss'],
})
export class AdminSubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  loading = true;
  saving = false;
  error = '';
  successMsg = '';

  showModal = false;
  isEdit = false;
  formData: Partial<Subject> & { _id?: string } = { name: '', code: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.getSubjects().subscribe({
      next: (res) => {
        this.subjects = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load subjects.';
        this.loading = false;
      },
    });
  }

  openAdd(): void {
    this.isEdit = false;
    this.formData = { name: '', code: '' };
    this.showModal = true;
    this.error = '';
  }

  openEdit(s: Subject): void {
    this.isEdit = true;
    this.formData = { ...s };
    this.showModal = true;
    this.error = '';
  }

  close(): void {
    this.showModal = false;
  }

  save(): void {
    if (!this.formData.name) {
      this.error = 'Subject name is required.';
      return;
    }
    this.saving = true;
    this.error = '';

    const req$ = this.isEdit && this.formData._id
      ? this.api.updateSubject(this.formData._id, this.formData)
      : this.api.createSubject(this.formData);

    req$.subscribe({
      next: () => {
        this.saving = false;
        this.showModal = false;
        this.successMsg = this.isEdit ? 'Subject updated!' : 'Subject created!';
        this.load();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Operation failed.';
      },
    });
  }

  delete(id: string, name: string): void {
    if (!confirm(`Delete subject \"${name}\"?`)) return;
    this.api.deleteSubject(id).subscribe({
      next: () => {
        this.successMsg = 'Subject deleted!';
        this.load();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Delete failed.';
      },
    });
  }
}

