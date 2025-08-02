import { CommonModule } from "@angular/common";
import { Component, computed, effect, Input, signal } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { env } from "../../../../../env/env";
import { formatarData } from "../../../../shared/helpers/formatar-data.helper";
import { Excursao, TipoPassageiroEnum, TipoPassageiroType } from "../../../../shared/models/excursao.type";
import { PacotesCountComponent } from "../../../pacotes/components/pacotes-count/pacotes-count.component";


@Component({
    selector: "app-jericoacoara-sidebar",
    imports: [CommonModule, PacotesCountComponent, ReactiveFormsModule],
    standalone: true,
    templateUrl: "./jericoacoara-sidebar.component.html",
    styleUrl: "./jericoacoara-sidebar.component.scss"
})
export class JericoacoaraSidebarComponent {
  public whatsappLink = env.WHATSAPP_LINK;
  public amountTickets = signal<any>([]);
  public amountTicketsNoValueZero = computed(() => this.amountTickets().filter((item: any) => item.value > 0));
  public hasOpcionaisAndTicketsSelecionados = computed(() => this.amountTicketsNoValueZero().length > 0 && this.excursao?.Pacotes?.Produto.length! > 0);
  public opcionais = computed(() => this.excursao?.Pacotes?.Produto);
  public opcionaisSelecionados = signal<any>([]);
  
  public enumCategory = [
    { key: "adults", value: "Pacote 2 dias e 1 noite", price: 375 },
    { key: "children", value: "Pacote 3 dias e 2 noites", price: 495 },
  ];

  @Input() form = new FormGroup<any>({});
  @Input() periodo: string = "";
  @Input() excursao: Excursao | null = null;
  @Input() isJeri: boolean = false;

  get valor() {
    return this.excursao?.valor ?? 0;
  }

  get locais() {
    return this.excursao?.LocalEmbarque;
  }

  constructor() {
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

  public opcionaisHandle(values: any, price: number) {
    if (this.opcionaisSelecionados().find((item: any) => item.key === values.key)) {
      let filter = this.opcionaisSelecionados().filter(
        (item: any) => item.key !== values.key
      );
      this.opcionaisSelecionados.set((filter || []).concat({ ...values, price}));
    } else this.opcionaisSelecionados.set((this.opcionaisSelecionados() || []).concat({ ...values, price}));
  }
}
