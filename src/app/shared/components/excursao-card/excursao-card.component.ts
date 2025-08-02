import { CommonModule, DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Origem, Transport } from "../../models/excursao.type";
import { FormataParcelasPipe } from "../../pipes/formata-parcelas.pipe";
import { FormatarPeriodoExcursao } from "../../pipes/formata-periodo-excursao.pipe";

@Component({
    selector: "app-excursao-card",
    imports: [
        CommonModule,
        RouterModule,
        FormatarPeriodoExcursao,
        FormataParcelasPipe,
    ],
    standalone: true,
    templateUrl: "./excursao-card.component.html",
    styleUrl: "./excursao-card.component.scss",
    providers: [DatePipe]
})
export class ExcursaoCardComponent {
  protected readonly pathFeatured = "M80,0 H0 Q25,180 0,360 H80 Z";
  protected readonly pathNormal = "M80,0 H0 Q40,180 0,360 H80 Z";

  @Input({ required: true }) id: string = "";
  @Input({ required: true }) thumbnail: string = "";
  @Input({ required: true }) title: string = "";
  @Input() duration: any = null;
  @Input({
    required: true,
    transform: (value: any) =>
      Origem.find((item) => item.key === value.toString())?.value,
  })
  origem: string = "";
  @Input({
    required: true,
    transform: (value: any) =>
      Transport.find((item) => item.key === value.toString())?.value,
  })
  transport: string = "";
  @Input({ required: true }) price: number = 0;
  @Input() shadow: boolean = true;
  @Input() featured: boolean = false;

  public getLink(id: string) {
    if (id === "jericoacoara") return `/${id}`;
    return `/pacotes/${id}`;
  }

  public getTipoTransporte(tipo: string) {
    return tipo.includes("terrestre") ? "pt-terrestre" : "pt-aereo";
  }
}
