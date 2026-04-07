import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  showProfileMenu = false;
  sidebarCollapsed = false;

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'school', label: 'Teachers', route: '/admin/teachers' },
    { icon: 'people', label: 'Users', route: '/admin/users' },
  ];

  constructor(public auth: AuthService) {}

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleProfile(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout(): void {
    this.auth.logout();
  }
}
