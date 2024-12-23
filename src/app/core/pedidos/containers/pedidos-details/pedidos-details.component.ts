import { CommonModule } from "@angular/common";
import { Component, computed, effect, Inject, signal } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { ProdutosSingleUsecase } from "../../../../features/pacotes/services/produtos-single.usecase";
import { Cliente } from "../../../../shared/models/cliente.type";
import { ReservaOutput } from "../../../../shared/models/reserva.type";
import { AsyncLocalEmbarquePipe } from "../../../../shared/pipes/async-local-embarque.pipe";
import { EmptyLabelPipe } from "../../../../shared/pipes/empty-label.pipe";
import { LabelReservaPipe } from "../../../../shared/pipes/label-reserva.pipe";
import { PeriodoPipe } from "../../../../shared/pipes/periodo.pipe";
import { ThumbnailPipe } from "../../../../shared/pipes/thumbnail.pipe";

@Component({
  selector: "app-pedidos-details",
  standalone: true,
  imports: [
    CommonModule,
    LabelReservaPipe,
    ThumbnailPipe,
    PeriodoPipe,
    AsyncLocalEmbarquePipe,
    EmptyLabelPipe,
    MatDialogModule,
  ],
  templateUrl: "./pedidos-details.component.html",
  styleUrl: "./pedidos-details.component.scss",
})
export class PedidosDetailsComponent {
  public client = signal<Cliente | null>(null);
  public reserva = signal<ReservaOutput | null>(null);
  public opcionais = signal<any>([]);
  public valorOpcionais = computed(() =>
    this.opcionais().filter((item: any) => item.id).reduce(
      (acc: number, item: any) => acc + (item.qtd * item.valor),
      0
    )
  );
  public valorIngresso = computed(() =>
    this.reserva()!.Transacoes.reduce(
      (acc: number, item: any) => acc + item.valor,
      0
    )
  );

  public valorTransacoes = computed(() => this.valorIngresso() + this.valorOpcionais());

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { id: string; client: Cliente },
    private readonly _pedido: ProdutosSingleUsecase
  ) {
    this.client.set(data.client);
    this.reserva.set(
      data.client.Reservas.find((item: ReservaOutput) => item.id === data.id)!
    );
    effect(() => {
      this.reserva()?.Opcionais.forEach((item: any) => {
        this._pedido
          .getProdutoById(item.idProduto)
          .then((res) => this.opcionais.set([...this.reserva()?.Opcionais.filter(options => options.id !== item.id)!, {
            ...item,
            valor: res.valor
          }]))
        ;
      })
    })
  }
}
