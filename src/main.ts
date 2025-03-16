import { EventEmitter } from 'events';
import 'zone.js';
import { enableProdMode, importProvidersFrom } from '@angular/core';   
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Augmente la limite maximal de listeners pour éviter les warnings
EventEmitter.defaultMaxListeners = 20;

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })
    ),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()
  ]
})
  .catch((err) => console.error(err));
