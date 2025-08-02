import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../shared/components/banner-cabecalho/banner-cabecalho.component";

@Component({
    selector: "app-formas-pagamento",
    imports: [BannerCabecalhoComponent],
    standalone: true,
    templateUrl: "./formas-pagamento.component.html",
    styleUrl: "./formas-pagamento.component.scss"
})
export class FormasPagamentoComponent {}
