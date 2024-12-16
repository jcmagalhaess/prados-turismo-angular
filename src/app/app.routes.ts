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
    },
    {
        path: 'pacotes/:id',
        pathMatch: 'full',
        loadComponent: () => import('./features/pacotes/containers/pacotes-single/pacotes-single.component').then(c => c.PacotesSingleComponent)
    },
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => import('./core/acesso/containers/acesso-index/acesso-index.component').then(c => c.AcessoIndexComponent)
    }
];
