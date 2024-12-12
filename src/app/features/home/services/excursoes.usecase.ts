import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";
import { Excursao } from "../../../shared/models/excursao.type";
import { PaginationResponse } from "../../../shared/models/pagination.type";

@Injectable({
  providedIn: "root",
})
export class ExcursoesUsecase {
  constructor(private readonly _http: HttpClient) {}

  public getExcursoes(
    size: string = "3",
    page: string = "1",
    order: string = "asc",
    orderBy: string = ""
  ) {
    return lastValueFrom(
      this._http.get<PaginationResponse<Excursao>>(
        `${env.API}/excursao/index?${new URLSearchParams({
          size,
          page,
          order,
          orderBy,
        })}`
      )
    );
  }
}
