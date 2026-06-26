import { HttpInterceptorFn } from '@angular/common/http';

const tokenKey = 'schoolsys.accessToken';

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const token = globalThis.localStorage?.getItem(tokenKey);

  if (!token || request.headers.has('Authorization')) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
