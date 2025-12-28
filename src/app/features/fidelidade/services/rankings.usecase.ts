import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";
import { benefitsList } from "./fidelidade.entity";

@Injectable({
  providedIn: "root",
})
export class RankingsUsecase {
  private _rankings = signal<any[]>([]);

  public benefitsList = computed(() => {
    return this._rankings().map((ranking) => ({
      ...ranking,
      qtdViagens: {
        qtdMinViagens: ranking.qtdMinViagens,
        qtdMaxViagens: ranking.qtdMaxViagens,
      },
      beneficios: benefitsList
        .filter((benefit) => benefit.nome === ranking.nome)
        .map((benefit) => benefit.beneficios)
        .flat(),
      urlImagem: this.getImageUrl(ranking.nome),
    }));
  });

  constructor(private readonly _http: HttpClient) {}

  /**
   * Get the image URL based on the ranking name
   * Checks if name contains "gold" or "platinum" (case insensitive)
   */
  private getImageUrl(rankingName: string): string {
    const nameLower = rankingName.toLowerCase();

    if (nameLower.includes('gold')) {
      return '../../../../assets/images/fidelidade-gold.png';
    }

    if (nameLower.includes('platinum')) {
      return '../../../../assets/images/fidelidade-platinum.png';
    }

    if (nameLower.includes('titanium')) {
      return '../../../../assets/images/fidelidade-titanium.png';
    }

    if (nameLower.includes('black')) {
      return '../../../../assets/images/fidelidade-black.png';
    }

    if (nameLower.includes('classic')) {
      return '../../../../assets/images/fidelidade-classic.png';
    }

    if (nameLower.includes('silver')) {
      return '../../../../assets/images/fidelidade-silver.png';
    }

    // Fallback to original logic if neither gold nor platinum
    return `../../../../assets/images/fidelidade-${nameLower}.png`;
  }

  public getRankings() {
    return lastValueFrom(
      this._http
        .get<any>(`${env.API}/ranking-clientes/findAll`)
        .pipe(tap((data) => this._rankings.set(data)))
    );
  }
}
