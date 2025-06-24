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
      urlImagem: `../../../../assets/images/fidelidade-${ranking.nome.toLowerCase()}.png`,
    }));
  });

  constructor(private readonly _http: HttpClient) {}

  public getRankings() {
    return lastValueFrom(
      this._http
        .get<any>(`${env.API}/ranking-clientes/findAll`)
        .pipe(tap((data) => this._rankings.set(data)))
    );
  }
}
