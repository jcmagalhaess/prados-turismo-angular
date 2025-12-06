import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionButtonComponent } from '../../../../shared/components/action-button/action-button.component';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
    selector: 'app-meu-carrinho-reserva',
    imports: [MatDialogModule, ActionButtonComponent],
    standalone: true,
    templateUrl: './meu-carrinho-reserva.component.html',
    styleUrl: './meu-carrinho-reserva.component.scss'
})
export class MeuCarrinhoReservaComponent {

  get loading() {
    return this._carrinho.loadingPagarMe;
  }

  constructor(
    private readonly _carrinho: CarrinhoService,
    private readonly _dialogRef: DialogRef
  ) {}

  public redirecionar() {
    this._carrinho
      .gerarLinkPagamentoAuto()
      .then(_ => {
        this._dialogRef.close();
        window.open(this._carrinho.pagarMeURL()!, '_blank');
      });
  }

  // Alternative method to use PagarMe (kept for backwards compatibility)
  public redirecionarPagarMe() {
    this._carrinho
      .gerarLinkPagamento()
      .then(_ => {
        this._dialogRef.close();
        window.open(this._carrinho.pagarMeURL()!, '_blank');
      });
  }
}
