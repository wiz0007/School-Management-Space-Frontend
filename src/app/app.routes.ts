import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then((component) => component.Home)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((component) => component.Dashboard)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((component) => component.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((component) => component.Register)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];