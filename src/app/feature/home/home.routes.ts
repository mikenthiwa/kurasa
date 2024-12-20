import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
      },
    ],
  },
] as Routes;
