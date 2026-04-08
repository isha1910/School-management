import { Routes } from '@angular/router';
import { adminGuard, guestGuard, studentGuard, teacherGuard } from './guards/auth.guard';

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
      {
        path: 'announcements',
        loadComponent: () => import('./pages/announcements/announcements.component').then(m => m.AnnouncementsComponent),
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
        path: 'admissions',
        loadComponent: () => import('./pages/admin/admissions/admin-admissions.component').then(m => m.AdminAdmissionsComponent),
      },
      {
        path: 'classes',
        loadComponent: () => import('./pages/admin/classes/admin-classes.component').then(m => m.AdminClassesComponent),
      },
      {
        path: 'subjects',
        loadComponent: () => import('./pages/admin/subjects/admin-subjects.component').then(m => m.AdminSubjectsComponent),
      },
      {
        path: 'assignments',
        loadComponent: () => import('./pages/admin/assignments/admin-assignments.component').then(m => m.AdminAssignmentsComponent),
      },
      {
        path: 'announcements',
        loadComponent: () => import('./pages/admin/announcements/admin-announcements.component').then(m => m.AdminAnnouncementsComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/admin-users.component').then(m => m.AdminUsersComponent),
      },
    ],
  },

  // ─── TEACHER ROUTES ───
  {
    path: 'teacher',
    canActivate: [teacherGuard],
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
      {
        path: 'my-classes',
        loadComponent: () => import('./pages/teacher/my-classes/teacher-my-classes.component').then(m => m.TeacherMyClassesComponent),
      },
      {
        path: 'classes/:classId/students',
        loadComponent: () => import('./pages/teacher/class-students/teacher-class-students.component').then(m => m.TeacherClassStudentsComponent),
      },
    ],
  },

  // ─── STUDENT ROUTES ───
  {
    path: 'student',
    canActivate: [studentGuard],
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

  // ─── LEGACY USER ROUTES (redirect based on role) ───
  // NOTE: redirectTo cannot be combined with guards. Use a component to redirect.
  {
    path: 'user',
    loadComponent: () => import('./pages/role-redirect/role-redirect.component').then(m => m.RoleRedirectComponent),
  },

  // ─── FALLBACK ───
  { path: '**', redirectTo: '', pathMatch: 'full' },
];