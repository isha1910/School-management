import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
})
export class TeacherDashboardComponent implements OnInit {
  loading = true;
  error = '';
  userName = '';
  assignmentCount = 0;

  constructor(private api: ApiService, private auth: AuthService) {
    this.userName = auth.getUser()?.name || 'Teacher';
  }

  ngOnInit(): void {
    this.loading = true;
    this.error = '';

    this.api.getMyTeachingAssignments().subscribe({
      next: (res) => {
        this.assignmentCount = res.data?.length || 0;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load teacher dashboard.';
        this.loading = false;
      },
    });
  }
}

