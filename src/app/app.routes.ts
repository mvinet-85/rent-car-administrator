import {Routes} from '@angular/router';
import {AuthGuard} from "./core/service/authentication/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'car',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./car/car-list/car-list.page').then(m => m.CarListPage)
      },
      {
        path: 'new',
        canActivate: [AuthGuard],
        loadComponent: () => import('./car/car-creation/car-creation.page').then(m => m.CarCreationPage)
      },
      {
        path: ':id',
        canActivate: [AuthGuard],
        loadComponent: () => import('./car/car-detail/car-detail.page').then(m => m.CarDetailPage)
      }
    ]

  }
];
