import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const tokenKey = 'schoolsys.accessToken';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = globalThis.localStorage?.getItem(tokenKey);

  return token ? true : router.createUrlTree(['/login']);
};
