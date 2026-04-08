import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  loading = true;
  error = '';
  items: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.api.getAnnouncements().subscribe({
      next: (res) => {
        this.items = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load announcements.';
        this.loading = false;
      },
    });
  }
}

