import { Routes } from "@angular/router";
import { MinhaContaComponent } from "./minha-conta.component";

export const routes: Routes = [
    {
        path: '',
        component: MinhaContaComponent,
        children: [
            {
                path: '',
                redirectTo: 'painel',
                pathMatch: 'full'
            },
            {
                path: 'painel',
                pathMatch: 'full',
                loadComponent: () => import('../painel/painel.component').then(c => c.PainelComponent)
            },
            {
                path: 'pedidos',
                pathMatch: 'full',
                loadComponent: () => import('../pedidos/pedidos.component').then(c => c.PedidosComponent)
            },
            {
                path: 'enderecos',
                pathMatch: 'full',
                loadComponent: () => import('../enderecos/containers/enderecos-index/enderecos-index.component').then(c => c.EnderecosIndexComponent)
            },
            {
                path: 'perfil',
                pathMatch: 'full',
                loadComponent: () => import('../perfil/perfil.component').then(c => c.PerfilComponent)
            }
        ]
    }
]