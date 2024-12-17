import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.scss'
})
export class MinhaContaComponent {
  public menu = [
    { label: 'Painel', route: '/minha-conta/' },
    { label: 'Pedidos', route: '/minha-conta/pedidos' },
    { label: 'Endereços', route: '/minha-conta/enderecos' },
    { label: 'Perfil', route: '/minha-conta/perfil' },
  ];

  constructor(private readonly _router: Router) {}

  public logout() {
    localStorage.removeItem('clientToken');

    this._router.navigate(['/login']);
  }
}
