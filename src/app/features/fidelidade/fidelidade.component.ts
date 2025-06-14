import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../shared/components/banner-cabecalho/banner-cabecalho.component";

@Component({
  selector: "app-fidelidade",
  standalone: true,
  imports: [BannerCabecalhoComponent],
  templateUrl: "./fidelidade.component.html",
  styleUrl: "./fidelidade.component.scss",
})
export class FidelidadeComponent {
  public titulo = `Viajar com a <strong>Prados Turismo</strong> garante recompensas incríveis!`;
}
