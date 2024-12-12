import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/containers/home-index/home-index.component').then(c => c.HomeIndexComponent)
    },
    {
        path: 'pacotes',
        pathMatch: 'full',
        loadComponent: () => import('./features/pacotes/containers/pacotes-index/pacotes-index.component').then(c => c.PacotesIndexComponent)
    }
];
