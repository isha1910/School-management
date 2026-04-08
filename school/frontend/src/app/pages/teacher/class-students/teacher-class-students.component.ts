import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-teacher-class-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-class-students.component.html',
  styleUrls: ['./teacher-class-students.component.scss'],
})
export class TeacherClassStudentsComponent implements OnInit {
  loading = true;
  error = '';
  students: any[] = [];
  classId = '';

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.classId = this.route.snapshot.paramMap.get('classId') || '';
    this.load();
  }

  load(): void {
    if (!this.classId) return;
    this.loading = true;
    this.error = '';

    this.api.getStudentsForMyClass(this.classId).subscribe({
      next: (res) => {
        this.students = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load students.';
        this.loading = false;
      },
    });
  }
}

