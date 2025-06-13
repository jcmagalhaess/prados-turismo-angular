import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../../shared/components/banner-cabecalho/banner-cabecalho.component";
import { TermosUsoContentComponent } from "../components/termos-uso-content/termos-uso-content.component";

@Component({
  selector: "app-termos-uso",
  standalone: true,
  imports: [TermosUsoContentComponent, BannerCabecalhoComponent],
  templateUrl: "./termos-uso.component.html",
  styleUrl: "./termos-uso.component.scss",
})
export class TermosUsoComponent {}
