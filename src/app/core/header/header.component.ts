import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExcursoesListUsecase } from '../../features/pacotes/services/excursoes-list.usecase';
import { AcessoGetDataPessoaUsecase } from '../acesso/services/acesso-get-data-pessoa.usecase';
import { MeuCarrinhoOffcanvasComponent } from '../meu-carrinho/components/meu-carrinho-offcanvas/meu-carrinho-offcanvas.component';
import { CarrinhoService } from '../meu-carrinho/services/carrinho.service';
import { HeaderStyleService as HeaderStyleInterceptor } from './header-style.interceptor';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, MeuCarrinhoOffcanvasComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ExcursoesListUsecase]
})
export class HeaderComponent implements OnInit {
  public menu = computed(() => [
    { label: 'Home', route: '/' },
    { label: 'Pacotes', route: '/pacotes' },
    { label: 'Jericoacoara', route: '/jericoacoara/' },
  ]);

  get client() {
    return this._userClient.clientAuthenticated();
  }

  get totalCarrinho() {
    return this._cart.amount;
  }

  get valoresCarrinho() {
    return this._cart.totalValue;
  }

  constructor(
    private readonly _router: Router,
    private readonly _cart: CarrinhoService,
    private readonly _userClient: AcessoGetDataPessoaUsecase,
    private readonly _headerInterceptor: HeaderStyleInterceptor
  ) {
    this._cart.pegarCarrinho();
  }

  public ngOnInit(): void {
    // window.addEventListener("scroll", function () {      
    //   const header = document.getElementById("header")!;      
      
    //   // Adiciona ou remove a classe com base na posição de rolagem
    //   if (window.scrollY > 50) {
    //     header.classList.add("header--scrolled");
    //   } else {
    //     header.classList.remove("header--scrolled");
    //   }
    // });
  }

  public navigate(route: string) {
    this._router.navigate([route]);
  }
}
