import { DecimalPipe } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { FormataParcelasPipe } from "../../../../shared/pipes/formata-parcelas.pipe";

@Component({
    selector: "app-pacotes-price",
    imports: [FormataParcelasPipe, DecimalPipe],
    standalone: true,
    templateUrl: "./pacotes-price.component.html",
    styleUrl: "./pacotes-price.component.scss"
})
export class PacotesPriceComponent {
  public price = input<number>(0);
  public showDatesEmit = output<boolean>();
  public showDates: boolean = false;

  public choosePeriod() {
    this.showDates = !this.showDates;
    this.showDatesEmit.emit(true);
  }
}
