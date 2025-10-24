import { CommonModule } from "@angular/common";
import { Component, computed, Inject, signal } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { NgxMaskPipe } from "ngx-mask";
import { Cliente } from "../../../../shared/models/cliente.type";
import { ReservaOutput } from "../../../../shared/models/reserva.type";
import { AsyncLocalEmbarquePipe } from "../../../../shared/pipes/async-local-embarque.pipe";
import { EmptyLabelPipe } from "../../../../shared/pipes/empty-label.pipe";
import { LabelReservaPipe } from "../../../../shared/pipes/label-reserva.pipe";
import { PeriodoPipe } from "../../../../shared/pipes/periodo.pipe";
import { ThumbnailPipe } from "../../../../shared/pipes/thumbnail.pipe";
import { ReservaService } from "../../reserva.service";

@Component({
  selector: "app-pedidos-details",
  imports: [
    CommonModule,
    LabelReservaPipe,
    ThumbnailPipe,
    PeriodoPipe,
    AsyncLocalEmbarquePipe,
    EmptyLabelPipe,
    MatDialogModule,
    NgxMaskPipe
  ],
  standalone: true,
  templateUrl: "./pedidos-details.component.html",
  styleUrl: "./pedidos-details.component.scss"
})
export class PedidosDetailsComponent {
  public passageiros = signal<any | null>(null);
  public cliente = signal<any>(null);
  public reserva = signal<Partial<ReservaOutput> | null>(null);
  public excursao = signal<any>(null);
  public transacoes = signal<any>(null);
  public opcionais = signal<any>([]);

  public valorOpcionais = computed(() =>
    this.opcionais().filter((item: any) => item.id).reduce(
      (acc: number, item: any) => acc + (item.qtd * item.Produto.valor),
      0
    )
  );
  public valorIngresso = computed(() =>
    this.excursao().valor
  );

  public valorTransacoes = computed(() => this.valorIngresso() + this.valorOpcionais());
  public hasOptionals = computed(() => this.opcionais().length > 0);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { id: string; client: Cliente },
    private readonly _reserva: ReservaService,
  ) {
    this._reserva.consultarReserva(data.id).then((res: any) => {
      console.log(res);
      this.passageiros.set(res.ExcursaoPassageiros)
      this.cliente.set(res.Pessoa);
      this.reserva.set({
        reserva: res.reserva,
        dataCadastro: res.dataCadastro,
        status: res.status,
      })
      this.excursao.set(res.Excursao);
      this.transacoes.set(res.Transacoes);
      this.opcionais.set(res.Opcionais)
    })
    // this.reserva.set(
    //   data.client.Reservas.find((item: ReservaOutput) => item.id === data.id)!
    // );
    // effect(() => {
    //   this.reserva()?.Opcionais.forEach((item: any) => {
    //     this._pedido
    //       .getExcursaoById(item.idProduto)
    //       .then((res) => this.opcionais.set([...this.reserva()?.Opcionais.filter(options => options.id !== item.id)!, {
    //         ...item,
    //         valor: res.valor
    //       }]))
    //     ;
    //   })
    // })
  }
}
