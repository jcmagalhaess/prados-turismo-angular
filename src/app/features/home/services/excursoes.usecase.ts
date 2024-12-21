import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";
import { Excursao } from "../../../shared/models/excursao.type";
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
    filter: any,
    size: string = "3",
    page: string = "1",
    order: string = "asc",
    orderBy: string = ""
  ) {
    let searchParams = { ...filter, size, page, order, orderBy };

    lastValueFrom(
      this._http.get<PaginationResponse<Excursao>>(
        `${env.API}/excursao/index?${new URLSearchParams(searchParams)}`
      )
    ).then((response: any) => {
      this._listaExcursoes.set(response.rows);
    });
  }
}
