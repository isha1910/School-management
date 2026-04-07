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

  router.navigate(['/login']);
  return false;
};

// Guard: must be admin
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn && auth.isAdmin()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

// Guard: redirect if already logged in
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  if (auth.isLoggedIn) {
    auth.redirectToDashboard();
    return false;
  }

  return true;
};
