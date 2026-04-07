import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  loading = true;
  saving = false;
  error = '';
  successMsg = '';
  searchTerm = '';

  // Edit modal
  showModal = false;
  editData = { _id: '', name: '', email: '', role: 'user' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  get filteredUsers(): any[] {
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(
      (u: any) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
  }

  loadUsers(): void {
    this.loading = true;
    this.api.getUsers().subscribe({
      next: (res) => {
        this.users = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users.';
        this.loading = false;
      },
    });
  }

  openEditModal(user: any): void {
    this.editData = { _id: user._id, name: user.name, email: user.email, role: user.role };
    this.showModal = true;
    this.error = '';
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveUser(): void {
    this.saving = true;
    this.error = '';

    this.api.updateUser(this.editData._id, {
      name: this.editData.name,
      email: this.editData.email,
      role: this.editData.role,
    }).subscribe({
      next: () => {
        this.saving = false;
        this.showModal = false;
        this.successMsg = 'User updated!';
        this.loadUsers();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Update failed.';
      },
    });
  }

  deleteUser(id: string, name: string): void {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    this.api.deleteUser(id).subscribe({
      next: () => {
        this.successMsg = 'User deleted!';
        this.loadUsers();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Delete failed.';
        setTimeout(() => (this.error = ''), 3000);
      },
    });
  }

  getRoleBadgeClass(role: string): string {
    return role === 'admin' ? 'badge-admin' : 'badge-user';
  }
}
