import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { clientRoutes } from './app/app.routes.client';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(clientRoutes)   // router provided here
  ]
}).catch(err => console.error(err));