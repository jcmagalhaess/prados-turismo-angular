import { CommonModule } from '@angular/common';
import { Component, computed } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LabelReservaPipe } from '../../shared/pipes/label-reserva.pipe';
import { PeriodoPipe } from '../../shared/pipes/periodo.pipe';
import { ThumbnailPipe } from '../../shared/pipes/thumbnail.pipe';
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";
import { PedidosService } from "../pedidos/pedidos.service";

@Component({
  selector: "app-painel",
  standalone: true,
  imports: [CommonModule, RouterModule, LabelReservaPipe, ThumbnailPipe, PeriodoPipe],
  templateUrl: "./painel.component.html",
  styleUrl: "./painel.component.scss",
})
export class PainelComponent {
  public valorPedido = computed(() => this.pedido().Transacoes.reduce((acc: number, item: any) => acc + item.valor, 0));
  
  get client() {
    return this._userClient.clientAuthenticated();
  }

  get pedido() {
    return this._pedido.lastReserva;
  }

  constructor(
    private readonly _userClient: AcessoGetDataPessoaUsecase,
    private readonly _pedido: PedidosService
  ) {}
}
