import { Routes } from '@angular/router';

export const routes: Routes = [
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
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then((component) => component.Home)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
