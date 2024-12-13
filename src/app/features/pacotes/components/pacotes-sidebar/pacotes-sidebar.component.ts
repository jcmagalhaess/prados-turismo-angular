import { CommonModule } from '@angular/common';
import { Component, Input, signal } from "@angular/core";
import { TipoPassageiroEnum, TipoPassageiroType } from '../../../../shared/models/excursao.type';
import { PacotesCountComponent } from "../pacotes-count/pacotes-count.component";

@Component({
  selector: "app-pacotes-sidebar",
  standalone: true,
  imports: [CommonModule, PacotesCountComponent],
  templateUrl: "./pacotes-sidebar.component.html",
  styleUrl: "./pacotes-sidebar.component.scss",
})
export class PacotesSidebarComponent {
  public amountTickets = signal<any>([]);
  
  public enumCategory = [
    { key: "adults", value: "Adultos", age: "+12 anos" },
    { key: "children", value: "Crianças", age: "6 a 12 anos" },
    { key: "babies", value: "Crianças de Colo", age: "0 a 5 anos" },
  ];

  @Input() periodo: string = "";
  @Input() valor: number = 0;

  public amountHandle(values: any) {
    if (this.amountTickets().find((item: any) => item.key === values.key)) {
      let filter = this.amountTickets().filter((item: any) => item.key !== values.key);
      this.amountTickets.set((filter || []).concat(values));
    } else this.amountTickets.set((this.amountTickets() || []).concat(values));
  }

  public amountLabel() {
    if (this.amountTickets().length === 0) return 'Selecione';

    let amount = this.amountTickets()
      .filter((item: any) => item.value > 0)
      .map((item: any) => (
        `${TipoPassageiroEnum[item.key as TipoPassageiroType]}: ${item.value}`
      ))
      .sort((a: any, b: any) => a.localeCompare(b));

    return amount.join(', ');
  }
}
