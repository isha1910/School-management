import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, type AdmissionApplication, type SchoolClass } from '../../../services/api.service';

@Component({
  selector: 'app-admin-admissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-admissions.component.html',
  styleUrls: ['./admin-admissions.component.scss'],
})
export class AdminAdmissionsComponent implements OnInit {
  loading = true;
  saving = false;
  error = '';
  successMsg = '';

  status: 'pending' | 'approved' | 'rejected' = 'pending';
  applications: AdmissionApplication[] = [];
  classes: SchoolClass[] = [];

  // approve modal
  showApproveModal = false;
  approveApp: AdmissionApplication | null = null;
  approveClassId: string | null = null;

  // reject modal
  showRejectModal = false;
  rejectApp: AdmissionApplication | null = null;
  rejectNotes = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadClasses();
    this.loadAdmissions();
  }

  loadClasses(): void {
    this.api.getClasses().subscribe({
      next: (res) => (this.classes = res.data || []),
      error: () => (this.classes = []),
    });
  }

  loadAdmissions(): void {
    this.loading = true;
    this.error = '';
    this.api.getAdmissions(this.status).subscribe({
      next: (res) => {
        this.applications = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load admissions.';
        this.loading = false;
      },
    });
  }

  setStatus(s: 'pending' | 'approved' | 'rejected'): void {
    this.status = s;
    this.loadAdmissions();
  }

  openApprove(app: AdmissionApplication): void {
    this.approveApp = app;
    this.approveClassId = (app.applyingForClassId as any) || null;
    this.showApproveModal = true;
    this.error = '';
  }

  closeApprove(): void {
    this.showApproveModal = false;
    this.approveApp = null;
    this.approveClassId = null;
  }

  confirmApprove(): void {
    if (!this.approveApp) return;
    this.saving = true;
    this.api.approveAdmission(this.approveApp._id, this.approveClassId).subscribe({
      next: (res) => {
        this.saving = false;
        this.closeApprove();
        this.successMsg = res.message || 'Application approved.';
        this.loadAdmissions();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Approve failed.';
      },
    });
  }

  openReject(app: AdmissionApplication): void {
    this.rejectApp = app;
    this.rejectNotes = '';
    this.showRejectModal = true;
    this.error = '';
  }

  closeReject(): void {
    this.showRejectModal = false;
    this.rejectApp = null;
    this.rejectNotes = '';
  }

  confirmReject(): void {
    if (!this.rejectApp) return;
    this.saving = true;
    this.api.rejectAdmission(this.rejectApp._id, this.rejectNotes).subscribe({
      next: (res) => {
        this.saving = false;
        this.closeReject();
        this.successMsg = res.message || 'Application rejected.';
        this.loadAdmissions();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Reject failed.';
      },
    });
  }
}

