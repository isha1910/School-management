import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  provideHttpClient,
  withInterceptors,
  withFetch
} from '@angular/common/http';

import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    // ✅ Angular core optimizations
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    // ✅ Routing
    provideRouter(routes),

    // ✅ HTTP CLIENT (IMPORTANT 🔥)
    provideHttpClient(
      withFetch(), // better performance
      withInterceptors([authInterceptor]) // interceptor
    )

  ]
};