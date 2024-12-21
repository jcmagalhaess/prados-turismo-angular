import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { AcessoLoginClientUsecase } from '../acesso/services/acesso-login-client.usecase';
import { PedidosService } from './pedidos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {  
  get reservas() {
    return this._order.reservas;
  }
  
  get noReservas() {
    return computed(() => this._order.reservas().length === 0);
  }
  
  constructor(
    private readonly _order: PedidosService,
    private readonly _login: AcessoLoginClientUsecase
  ) {
    this._login.login(this._login.dataCache);
  }
  
  public orderNumber(reserva: number) {
    let order = reserva.toString();
    
    return `#${order.padStart(4, '0')}`;
  }

  public statusLabel(status: false) {
    return status ? 'Aprovado' : 'Aguardando';
  }
}
