import { CommonModule } from '@angular/common';
import { Component, effect, Input, signal } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExcursaoLocalEmbarque, TipoPassageiroEnum, TipoPassageiroType } from '../../../../shared/models/excursao.type';
import { PacotesCountComponent } from "../pacotes-count/pacotes-count.component";
import { PacotesModalComponent } from '../pacotes-modal/pacotes-modal.component';

@Component({
  selector: "app-pacotes-sidebar",
  standalone: true,
  imports: [CommonModule, PacotesCountComponent, ReactiveFormsModule],
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

  @Input() form = new FormGroup<any>({});
  @Input() periodo: string = "";
  @Input() valor: number = 0;
  @Input() locais: ExcursaoLocalEmbarque[] = [];

  constructor(private readonly _dialog: MatDialog) {
    effect(() => {
      this.form.controls['tickets'].setValue(this.amountTickets());
    })
  }

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

  public createReservation() {
    this._dialog.open(
      PacotesModalComponent,
      {
        minWidth: '90vw',
        data: {
          tickets: this._takeAmountTickets(this.amountTickets()),
          price: this._takeTotalPrices(this.amountTickets(), this.valor),
          locales: this.locais
        }
      }
    );
  }

  private _takeAmountTickets(list: Array<any>) {
    return list.reduce((acc: any, item: any) => acc + item.value, 0);
  }

  private _takeTotalPrices(tickets: Array<any>, price: number) {
    let filter = tickets.filter((item: any) => item.key !== 'babies');
    
    return this._takeAmountTickets(filter) * price;
  }
}
