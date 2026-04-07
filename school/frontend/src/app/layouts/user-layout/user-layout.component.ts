import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent {
  showProfileMenu = false;
  sidebarCollapsed = false;

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/user/dashboard' },
    { icon: 'school', label: 'Teachers', route: '/user/teachers' },
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
