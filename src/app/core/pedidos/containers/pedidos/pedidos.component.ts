import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Excursao } from '../../../../shared/models/excursao.type';
import { LabelReservaPipe } from '../../../../shared/pipes/label-reserva.pipe';
import { PedidosModalComponent } from '../../components/pedidos-modal/pedidos-modal.component';
import { PedidosService } from '../../pedidos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, LabelReservaPipe],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
  providers: [PedidosService]
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
    private readonly _dialog: MatDialog
  ) { }

  public statusLabel(status: false) {
    return status ? 'Aprovado' : 'Aguardando';
  }
  
  public totalTransacoes(lista: any) {
    return lista.reduce((acc: any, item: any) => acc + item.valor, 0);;
  }

  public visualizar(item: Excursao) {
    this._dialog.open(PedidosModalComponent, {
      width: '800px',
      data: item
    })
  }
}
