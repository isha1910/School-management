import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard: must be logged in
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    return true;
  }

  return router.parseUrl('/login');
};

const roleGuard =
  (...roles: Array<'admin' | 'teacher' | 'student'>): CanActivateFn =>
  () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn) {
      return router.parseUrl('/login');
    }

    const role = auth.getRole();

    if (role && roles.includes(role as any)) {
      return true;
    }

    return router.parseUrl('/user');
  };

export const adminGuard = roleGuard('admin');
export const teacherGuard = roleGuard('teacher');
export const studentGuard = roleGuard('student');

// Guard: redirect if already logged in
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    return router.parseUrl('/user');
  }

  return true;
};