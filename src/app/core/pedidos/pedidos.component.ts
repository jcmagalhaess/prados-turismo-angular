import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    return this._order.noReservas;
  }
  
  constructor(
    private readonly _order: PedidosService,
  ) { }
  
  public orderNumber(reserva: number) {
    let order = reserva.toString();
    
    return `#${order.padStart(4, '0')}`;
  }

  public statusLabel(status: false) {
    return status ? 'Aprovado' : 'Aguardando';
  }
  
  public totalTransacoes(lista: any) {
    return lista.reduce((acc: any, item: any) => acc + item.valor, 0);;
  }
}
