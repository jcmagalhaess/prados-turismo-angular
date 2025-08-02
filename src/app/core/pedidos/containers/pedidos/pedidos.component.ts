import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToasterService } from "../../../../shared/components/toaster/toaster.service";
import { LabelReservaPipe } from "../../../../shared/pipes/label-reserva.pipe";
import { PedidosModalComponent } from "../../components/pedidos-modal/pedidos-modal.component";
import { PedidosService } from "../../pedidos.service";
import { ReservaService } from "../../reserva.service";

@Component({
  selector: "app-pedidos",
  imports: [CommonModule, LabelReservaPipe],
  standalone: true,
  templateUrl: "./pedidos.component.html",
  styleUrl: "./pedidos.component.scss",
  providers: [PedidosService],
})
export class PedidosComponent {
  get reservas() {
    return this._order.reservas;
  }

  get noReservas() {
    return this._order.noReservas;
  }

  get client() {
    return this._order.client;
  }

  constructor(
    private readonly _order: PedidosService,
    private readonly _reserva: ReservaService,
    private readonly _dialog: MatDialog,
    private readonly _toaster: ToasterService
  ) {}

  public statusLabel(status: false) {
    return status ? "Aprovado" : "Aguardando";
  }

  public totalTransacoes(lista: any) {
    return lista.reduce((acc: any, item: any) => acc + item.valor, 0);
  }

  public visualizar(id: string) {
    this._dialog.open(PedidosModalComponent, {
      width: "800px",
      maxWidth: "95vw",
      data: {
        id,
        client: this.client,
      },
    });
  }

  public voucher(id: string) {
    this._reserva.downloadVoucher(id);
  }
}
