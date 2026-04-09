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

  get menuItems(): Array<{ icon: string; label: string; route: string }> {
    if (this.auth.isTeacher()) {
      return [
        { icon: 'dashboard', label: 'Dashboard', route: '/teacher/dashboard' },
        { icon: 'groups', label: 'My Classes', route: '/teacher/my-classes' },
      ];
    }

    // Student/legacy user
    return [
      { icon: 'dashboard', label: 'Dashboard', route: '/student/dashboard' },
      { icon: 'school', label: 'Teachers', route: '/student/teachers' },
    ];
  }

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
