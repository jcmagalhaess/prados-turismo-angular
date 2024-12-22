import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExcursoesListUsecase } from '../../features/pacotes/services/excursoes-list.usecase';
import { AcessoGetDataPessoaUsecase } from '../acesso/services/acesso-get-data-pessoa.usecase';
import { MeuCarrinhoOffcanvasComponent } from '../meu-carrinho/components/meu-carrinho-offcanvas/meu-carrinho-offcanvas.component';
import { CarrinhoService } from '../meu-carrinho/services/carrinho.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, MeuCarrinhoOffcanvasComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ExcursoesListUsecase]
})
export class HeaderComponent {
  public menu = computed(() => [
    { label: 'Home', route: '/' },
    { label: 'Pacotes', route: '/pacotes' },
    { label: 'Jericoacoara', route: '/pacotes/' + this.jeriId() },
  ]);
  public jeriId = computed(() => {
    if (this._excursoes.excursoes().length > 0) {
      return this._excursoes.excursoes()[0].id
    } else {
      return ''
    }
  });

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
    private readonly _excursoes: ExcursoesListUsecase
  ) {
    this._cart.pegarCarrinho();
    this._excursoes.getExcursoes({ nome: 'Jericoacoara' });
  }

  public navigate(route: string) {
    this._router.navigate([route]);
  }
}
