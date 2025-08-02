import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../shared/components/banner-cabecalho/banner-cabecalho.component";

@Component({
    selector: "app-politica-privacidade",
    imports: [BannerCabecalhoComponent],
    standalone: true,
    templateUrl: "./politica-privacidade.component.html",
    styleUrl: "./politica-privacidade.component.scss"
})
export class PoliticaPrivacidadeComponent {}
