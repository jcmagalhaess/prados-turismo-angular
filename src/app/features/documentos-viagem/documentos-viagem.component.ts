import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../shared/components/banner-cabecalho/banner-cabecalho.component";

@Component({
    selector: "app-documentos-viagem",
    imports: [BannerCabecalhoComponent],
    standalone: true,
    templateUrl: "./documentos-viagem.component.html",
    styleUrl: "./documentos-viagem.component.scss"
})
export class DocumentosViagemComponent {}
