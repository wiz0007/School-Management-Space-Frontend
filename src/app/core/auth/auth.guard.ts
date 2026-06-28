import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.currentUser()) {
    return true;
  }

  return authService.loadCurrentUser().pipe(
    map(() => true),
    catchError(() =>
      authService.refreshSession().pipe(
        map(() => true),
        catchError(() => of(router.createUrlTree(['/login'])))
      )
    )
  );
};