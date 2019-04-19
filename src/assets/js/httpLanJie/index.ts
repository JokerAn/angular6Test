import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './base-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
  // { provide: HTTP_INTERCEPTORS, useClass: ServerURLInterceptor, multi: true }
];
