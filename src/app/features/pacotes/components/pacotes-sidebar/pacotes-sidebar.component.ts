import { CommonModule } from "@angular/common";
import { Component, computed, effect, Input, signal } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { formatarData } from "../../../../shared/helpers/formatar-data.helper";
import {
  Excursao,
  TipoPassageiroEnum,
  TipoPassageiroType,
} from "../../../../shared/models/excursao.type";
import { PeriodoPipe } from "../../../../shared/pipes/periodo.pipe";
import { PacotesCountComponent } from "../pacotes-count/pacotes-count.component";
import { PacotesModalComponent } from "../pacotes-modal/pacotes-modal.component";

@Component({
  selector: "app-pacotes-sidebar",
  standalone: true,
  imports: [CommonModule, PacotesCountComponent, ReactiveFormsModule, PeriodoPipe],
  templateUrl: "./pacotes-sidebar.component.html",
  styleUrl: "./pacotes-sidebar.component.scss",
})
export class PacotesSidebarComponent {
  public amountTickets = signal<any>([]);
  public amountTicketsNoValueZero = computed(() => this.amountTickets().filter((item: any) => item.value > 0));
  public hasOpcionaisAndTicketsSelecionados = computed(() => this.amountTicketsNoValueZero().length > 0 && this.excursao?.Pacotes?.Produto.length! > 0);
  public opcionais = computed(() => this.excursao?.Pacotes?.Produto);
  public opcionaisSelecionados = signal<any>([]);
  
  public enumCategory = [
    { key: "adults", value: "Adultos", age: "+12 anos" },
    { key: "children", value: "Crianças", age: "6 a 12 anos" },
    { key: "babies", value: "Crianças de Colo", age: "0 a 5 anos" },
  ];

  @Input() form = new FormGroup<any>({});
  @Input() periodo: string = "";
  @Input() excursao: Excursao | null = null;

  get valor() {
    return this.excursao?.valor ?? 0;
  }

  get locais() {
    return this.excursao?.LocalEmbarque;
  }

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    effect(() => {
      this.form.controls["tickets"].setValue(this.amountTickets());
    });
  }
  public formatandoPeriodo(dataInicio: string, dataFim: string) {
    return `${formatarData(new Date(dataInicio))} a ${formatarData(
      new Date(dataFim)
    )}`;
  }

  public amountHandle(values: any) {
    if (this.amountTickets().find((item: any) => item.key === values.key)) {
      let filter = this.amountTickets().filter(
        (item: any) => item.key !== values.key
      );
      this.amountTickets.set((filter || []).concat(values));
    } else this.amountTickets.set((this.amountTickets() || []).concat(values));
  }

  public amountLabel() {
    if (this.amountTicketsNoValueZero().length === 0) return "Selecione";

    let amount = this.amountTicketsNoValueZero()
      .map(
        (item: any) =>
          `${TipoPassageiroEnum[item.key as TipoPassageiroType]}: ${item.value}`
      )
      .sort((a: any, b: any) => a.localeCompare(b));

    return amount.join(", ");
  }

  public createReservation() {
    const dialogRef = this._dialog.open(PacotesModalComponent, {
      minWidth: "90vw",
      disableClose: true,
      data: {
        tickets: this._takeAmountTickets(this.amountTickets()),
        price: this._takeTotalPrices(this.amountTickets(), this.valor),
        locales: this.locais,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) return;

      let item = {
        id: this.excursao?.id,
        price: this.excursao?.valor,
        nome: this.excursao?.nome,
        periodo: {
          dataInicio: this.excursao?.dataInicio,
          dataFim: this.excursao?.dataFim,
        },
        tickets: this.amountTickets()
          .filter((item: any) => item.value > 0)
          .map((item: any) => ({ ...item, price: this._buildPrice(item) })),
        participantes: this._formatBirthday(res),
        opcionais: this.opcionaisSelecionados(),
      };

      sessionStorage.setItem("pacote", JSON.stringify(item));

      this._router.navigateByUrl("checkout");
    });
  }

  public opcionaisHandle(values: any, price: number) {
    if (this.opcionaisSelecionados().find((item: any) => item.key === values.key)) {
      let filter = this.opcionaisSelecionados().filter(
        (item: any) => item.key !== values.key
      );
      this.opcionaisSelecionados.set((filter || []).concat({ ...values, price}));
    } else this.opcionaisSelecionados.set((this.opcionaisSelecionados() || []).concat({ ...values, price}));
  }

  private _buildPrice(item: any) {
    if (item.key === "babies") return 0;

    return (this.excursao?.valor ?? 0) * item.value
  }

  private _formatBirthday(items: Array<any>) {
    return items.map((item: any) => ({
      ...item,
      dataNascimento:
        item.dataNascimento.ano +
        "-" +
        item.dataNascimento.mes.padStart(2, "0") +
        "-" +
        item.dataNascimento.dia.padStart(2, "0"),
    }));
  }

  private _takeAmountTickets(list: Array<any>) {
    return list.reduce((acc: any, item: any) => acc + item.value, 0);
  }

  private _takeTotalPrices(tickets: Array<any>, price: number) {
    let filter = tickets.filter((item: any) => item.key !== "babies");

    return this._takeAmountTickets(filter) * price;
  }
}
