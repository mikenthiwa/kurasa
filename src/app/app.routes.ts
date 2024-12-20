import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    loadChildren: () => import('./feature/home/home.routes'),
  },
];
