import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";
import { removeNulls } from "../../../shared/helpers/remove-nulls.helper";
import { Excursao } from "../../../shared/models/excursao.type";
import { EnumType } from "../../../shared/models/global.type";
import { Pacotes } from "../../../shared/models/pacotes.type";
import { PaginationResponse } from "../../../shared/models/pagination.type";

@Injectable({
  providedIn: "root",
})
export class ExcursoesListUsecase {
  private _excursoes = signal<Excursao[]>([]);
  private _destinos = signal<EnumType<string>[]>([]);
  private _loading = signal<boolean>(false);

  get excursoes() {
    return this._excursoes;
  }

  get destinos() {
    return this._destinos;
  }

  get loading() {
    return this._loading;
  }

  constructor(private readonly _http: HttpClient) {}

  public getExcursoes(
    filter: any,
    size: string = "999",
    page: string = "1",
    order: string = "asc",
    orderBy: string = ""
  ) {
    this._loading.set(true);

    let searchParams: any = { size, page, order, orderBy };

    if (filter) searchParams = { ...searchParams, ...removeNulls(filter) };

    return lastValueFrom(
      this._http
        .get<PaginationResponse<Pacotes>>(
          `${env.API}/excursao/index?${new URLSearchParams(searchParams)}`
        )
        .pipe(
          tap((res) => this._excursoes.set(res.rows.map((excursao) => excursao as any))),
          tap((res) => this._destinos.set(res.rows.map((destino) => ({
            key: destino.id,
            value: destino.nome
          })))),
          finalize(() => this._loading.set(false))
        )
    );
  }
}
