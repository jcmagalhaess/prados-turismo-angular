import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { env } from "../../../../env/env";
import { calcularDiasENoites } from "../../../shared/helpers/calcular-dias-noites.helpers";
import { Excursao, OrigemEnum } from "../../../shared/models/excursao.type";
import { PaginationResponse } from "../../../shared/models/pagination.type";

@Injectable({
  providedIn: "root",
})
export class ExcursoesUsecase {
  private _listaExcursoes = signal<Excursao[]>([]);

  get listaExcursoes() {
    return this._listaExcursoes();
  }
  
  constructor(private readonly _http: HttpClient) {}

  public getExcursoes(
    size: string = "3",
    page: string = "1",
    order: string = "asc",
    orderBy: string = ""
  ) {
    let searchParams = { size, page, order, orderBy };
    
    lastValueFrom(
      this._http
        .get<PaginationResponse<Excursao>>(`${env.API}/excursao/index?${new URLSearchParams(searchParams)}`)
        .pipe(map((response) => ({
          ...response,
          rows: response.rows.map((excursao) => this._excursoesMapper(excursao)),
        })))
    ).then((response: any) => {
      this._listaExcursoes.set(response.rows);
    });
  }

  private _excursoesMapper(excursoes: Excursao) {
    return {
        ...excursoes,
        duracao: calcularDiasENoites(excursoes.dataInicio, excursoes.dataFim),
        valorFormatado: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(excursoes.valor),
        Pacotes: {
            ...excursoes.Pacotes,
            categoria: (OrigemEnum as any)[`_${ excursoes.Pacotes.origem }`]
        }
    };
  }
}
