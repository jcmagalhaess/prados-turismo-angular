import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../shared/components/banner-cabecalho/banner-cabecalho.component";

@Component({
  selector: "app-politica-privacidade",
  standalone: true,
  imports: [BannerCabecalhoComponent],
  templateUrl: "./politica-privacidade.component.html",
  styleUrl: "./politica-privacidade.component.scss",
})
export class PoliticaPrivacidadeComponent {}
