import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-teacher-my-classes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-my-classes.component.html',
  styleUrls: ['./teacher-my-classes.component.scss'],
})
export class TeacherMyClassesComponent implements OnInit {
  loading = true;
  error = '';
  assignments: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.api.getMyTeachingAssignments().subscribe({
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
}

