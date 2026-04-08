import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ApiService,
  type SchoolClass,
  type Subject,
  type TeachingAssignment,
} from '../../../services/api.service';

@Component({
  selector: 'app-admin-assignments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-assignments.component.html',
  styleUrls: ['./admin-assignments.component.scss'],
})
export class AdminAssignmentsComponent implements OnInit {
  loading = true;
  saving = false;
  error = '';
  successMsg = '';

  assignments: TeachingAssignment[] = [];
  teachers: any[] = [];
  classes: SchoolClass[] = [];
  subjects: Subject[] = [];

  // create form
  teacherUserId = '';
  classId = '';
  subjectIds: string[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = '';

    this.api.getUsers().subscribe({
      next: (res) => (this.teachers = (res.data || []).filter((u: any) => u.role === 'teacher')),
      error: () => (this.teachers = []),
    });

    this.api.getClasses().subscribe({
      next: (res) => (this.classes = res.data || []),
      error: () => (this.classes = []),
    });

    this.api.getSubjects().subscribe({
      next: (res) => (this.subjects = res.data || []),
      error: () => (this.subjects = []),
    });

    this.api.getAssignments().subscribe({
      next: (res) => {
        this.assignments = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load assignments.';
        this.loading = false;
      },
    });
  }

  toggleSubject(id: string, checked: boolean): void {
    if (checked) this.subjectIds = Array.from(new Set([...this.subjectIds, id]));
    else this.subjectIds = this.subjectIds.filter((x) => x !== id);
  }

  save(): void {
    if (!this.teacherUserId || !this.classId) {
      this.error = 'Teacher and class are required.';
      return;
    }

    this.saving = true;
    this.error = '';

    this.api
      .upsertAssignment({
        teacherUserId: this.teacherUserId,
        classId: this.classId,
        subjectIds: this.subjectIds,
      })
      .subscribe({
        next: (res) => {
          this.saving = false;
          this.successMsg = res.message || 'Assignment saved.';
          this.teacherUserId = '';
          this.classId = '';
          this.subjectIds = [];
          this.loadAll();
          setTimeout(() => (this.successMsg = ''), 3000);
        },
        error: (err) => {
          this.saving = false;
          this.error = err.error?.message || 'Save failed.';
        },
      });
  }

  delete(id: string): void {
    if (!confirm('Delete this assignment?')) return;
    this.api.deleteAssignment(id).subscribe({
      next: () => {
        this.successMsg = 'Assignment deleted!';
        this.loadAll();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Delete failed.';
      },
    });
  }
}

