import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { env } from "../../../../env/env";
import { calcularDiasENoites } from "../../../shared/helpers/calcular-dias-noites.helpers";
import { Excursao, OrigemEnum } from "../../../shared/models/excursao.type";

@Injectable({
  providedIn: "root",
})
export class ExcursoesSingleUsecase {
  private _excursao = signal<Excursao | null>(null);

  get excursao() {
    return this._excursao;
  }

  constructor(private readonly _http: HttpClient) {}

  public getExcursaoById(id: string) {
    lastValueFrom(
      this._http
        .get<Excursao>(`${env.API}/excursao/find/${id}`)
        .pipe(map((response) => this._excursoesMapper(response)))
    ).then((response: any) => {
      this._excursao.set(response);
    });
  }

  private _excursoesMapper(excursoes: Excursao) {
    return {
      ...excursoes,
      duracao: calcularDiasENoites(excursoes.dataInicio, excursoes.dataFim),
      valorFormatado: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(excursoes.valor),
      Pacotes: {
        ...excursoes.Pacotes,
        categoria: (OrigemEnum as any)[`_${excursoes.Pacotes.origem}`],
      },
    };
  }
}
