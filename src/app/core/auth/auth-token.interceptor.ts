import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith('http://localhost:8080/api/')) {
    return next(request);
  }

  return next(
    request.clone({
      withCredentials: true
    })
  );
};
