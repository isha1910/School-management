import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-announcements.component.html',
  styleUrls: ['./admin-announcements.component.scss'],
})
export class AdminAnnouncementsComponent implements OnInit {
  loading = true;
  saving = false;
  error = '';
  successMsg = '';

  items: any[] = [];

  showModal = false;
  isEdit = false;
  formData: any = { _id: '', title: '', body: '', audience: 'all', pinned: false };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.getAnnouncements().subscribe({
      next: (res) => {
        this.items = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load announcements.';
        this.loading = false;
      },
    });
  }

  openAdd(): void {
    this.isEdit = false;
    this.formData = { _id: '', title: '', body: '', audience: 'all', pinned: false };
    this.showModal = true;
    this.error = '';
  }

  openEdit(a: any): void {
    this.isEdit = true;
    this.formData = { ...a };
    this.showModal = true;
    this.error = '';
  }

  close(): void {
    this.showModal = false;
  }

  save(): void {
    if (!this.formData.title || !this.formData.body) {
      this.error = 'Title and body are required.';
      return;
    }
    this.saving = true;
    this.error = '';

    const payload = {
      title: this.formData.title,
      body: this.formData.body,
      audience: this.formData.audience,
      pinned: !!this.formData.pinned,
    };

    const req$ = this.isEdit && this.formData._id
      ? this.api.updateAnnouncement(this.formData._id, payload)
      : this.api.createAnnouncement(payload);

    req$.subscribe({
      next: (res) => {
        this.saving = false;
        this.showModal = false;
        this.successMsg = res.message || (this.isEdit ? 'Announcement updated!' : 'Announcement created!');
        this.load();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Operation failed.';
      },
    });
  }

  delete(id: string): void {
    if (!confirm('Delete this announcement?')) return;
    this.api.deleteAnnouncement(id).subscribe({
      next: () => {
        this.successMsg = 'Announcement deleted!';
        this.load();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Delete failed.';
      },
    });
  }
}

