import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('./authentcation/authentcation.module').then((m) => m.AuthentcationModule),
    }
];
