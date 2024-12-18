import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AcessoClientAuthenticatedUsecase } from '../acesso/services/acesso-client-authenticated.usecase';
import { CarrinhoService } from '../meu-carrinho/carrinho.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menu = [
    { label: 'Home', route: '/' },
    { label: 'Pacotes', route: '/pacotes' },
  ];

  get client() {
    return this._user.clientAuthenticated;
  }

  get totalCarrinho() {
    return this._cart.amount;
  }

  get valoresCarrinho() {
    return this._cart.price;
  }

  constructor(
    private readonly _router: Router,
    private readonly _user: AcessoClientAuthenticatedUsecase,
    private readonly _cart: CarrinhoService
  ) {
    this._cart.pegarCarrinho();
  }

  public navigate(route: string) {
    this._router.navigate([route]);
  }
}
