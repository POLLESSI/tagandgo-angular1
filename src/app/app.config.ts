import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { intercept } from './interceptors/token.interceptor';
import { ApiClient } from './api-client';
import { API_BASE_URL } from './api-client';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([intercept]),
    ),
    ApiClient,
    { provide: API_BASE_URL, useValue: environment.apiUrl }, // Utilise l'URL de l'environnement
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};
