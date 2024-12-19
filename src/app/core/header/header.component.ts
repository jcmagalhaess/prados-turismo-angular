import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MeuCarrinhoOffcanvasComponent } from '../meu-carrinho/components/meu-carrinho-offcanvas/meu-carrinho-offcanvas.component';
import { CarrinhoService } from '../meu-carrinho/services/carrinho.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, MeuCarrinhoOffcanvasComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menu = [
    { label: 'Home', route: '/' },
    { label: 'Pacotes', route: '/pacotes' },
  ];

  get client() {
    return this._cart.user.clientAuthenticated;
  }

  get totalCarrinho() {
    return this._cart.amount;
  }

  get valoresCarrinho() {
    return this._cart.price;
  }

  constructor(
    private readonly _router: Router,
    private readonly _cart: CarrinhoService
  ) {
    this._cart.pegarCarrinho();
  }

  public navigate(route: string) {
    this._router.navigate([route]);
  }
}
