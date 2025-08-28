import { DecimalPipe } from "@angular/common";
import { Component, Input, input, output } from "@angular/core";
import { Transport } from "../../../../shared/models/excursao.type";
import { FormataParcelasPipe } from "../../../../shared/pipes/formata-parcelas.pipe";

@Component({
  selector: "app-pacotes-price",
  imports: [FormataParcelasPipe, DecimalPipe],
  standalone: true,
  templateUrl: "./pacotes-price.component.html",
  styleUrl: "./pacotes-price.component.scss",
})
export class PacotesPriceComponent {
  public price = input<number>(0);
  @Input({
    required: true,
    transform: (value: any) =>
      Transport.find((item) => item.key === value.toString())?.value,
  })
  transport: string = "";
  public showDatesEmit = output<boolean>();
  public showDates: boolean = false;

  public choosePeriod() {
    this.showDates = !this.showDates;
    this.showDatesEmit.emit(true);
  }
}
