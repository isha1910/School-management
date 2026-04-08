import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, type SchoolClass } from '../../../services/api.service';

@Component({
  selector: 'app-admin-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss'],
})
export class AdminClassesComponent implements OnInit {
  classes: SchoolClass[] = [];
  loading = true;
  saving = false;
  error = '';
  successMsg = '';

  // Modal state
  showModal = false;
  isEdit = false;
  formData: Partial<SchoolClass> & { _id?: string } = { name: '', grade: '', section: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.getClasses().subscribe({
      next: (res) => {
        this.classes = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load classes.';
        this.loading = false;
      },
    });
  }

  openAdd(): void {
    this.isEdit = false;
    this.formData = { name: '', grade: '', section: '' };
    this.showModal = true;
    this.error = '';
  }

  openEdit(c: SchoolClass): void {
    this.isEdit = true;
    this.formData = { ...c };
    this.showModal = true;
    this.error = '';
  }

  close(): void {
    this.showModal = false;
  }

  save(): void {
    if (!this.formData.name) {
      this.error = 'Class name is required.';
      return;
    }

    this.saving = true;
    this.error = '';

    const req$ = this.isEdit && this.formData._id
      ? this.api.updateClass(this.formData._id, this.formData)
      : this.api.createClass(this.formData);

    req$.subscribe({
      next: () => {
        this.saving = false;
        this.showModal = false;
        this.successMsg = this.isEdit ? 'Class updated!' : 'Class created!';
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
    if (!confirm(`Delete class \"${name}\"?`)) return;
    this.api.deleteClass(id).subscribe({
      next: () => {
        this.successMsg = 'Class deleted!';
        this.load();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Delete failed.';
      },
    });
  }
}

