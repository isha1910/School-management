import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  teacherCount = 0;
  loading = true;
  userName = '';

  constructor(private api: ApiService, private auth: AuthService) {
    this.userName = auth.getUser()?.name || 'User';
  }

  ngOnInit(): void {
    this.api.getTeachers().subscribe({
      next: (res) => {
        this.teacherCount = res.data?.length || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
