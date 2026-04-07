import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  // ─── PUBLIC PAGES (with header/footer layout) ───
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'teachers',
        loadComponent: () => import('./pages/public-teachers/public-teachers.component').then(m => m.PublicTeachersComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
      },
    ],
  },

  // ─── AUTH (guest only) ───
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
  },

  // ─── ADMIN ROUTES ───
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'teachers',
        loadComponent: () => import('./pages/admin/teachers/admin-teachers.component').then(m => m.AdminTeachersComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/admin-users.component').then(m => m.AdminUsersComponent),
      },
    ],
  },

  // ─── USER ROUTES ───
  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/user/dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),
      },
      {
        path: 'teachers',
        loadComponent: () => import('./pages/user/teachers/user-teachers.component').then(m => m.UserTeachersComponent),
      },
    ],
  },

  // ─── FALLBACK ───
  { path: '**', redirectTo: '', pathMatch: 'full' },
];