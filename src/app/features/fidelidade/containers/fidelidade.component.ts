import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../../shared/components/banner-cabecalho/banner-cabecalho.component";
import { FidelidadeBeneficioComponent } from "../components/fidelidade-beneficio/fidelidade-beneficio.component";
import { RankingsUsecase } from "../services/rankings.usecase";

@Component({
    selector: "app-fidelidade",
    imports: [BannerCabecalhoComponent, FidelidadeBeneficioComponent],
    standalone: true,
    templateUrl: "./fidelidade.component.html",
    styleUrl: "./fidelidade.component.scss"
})
export class FidelidadeComponent {
  public titulo = `Viajar com a <strong>Prados Turismo</strong> garante recompensas incríveis!`;

  get beneficios() {
    return this._rankings.benefitsList;
  }

  constructor(private readonly _rankings: RankingsUsecase) {
    this._rankings.getRankings();
  }
}
