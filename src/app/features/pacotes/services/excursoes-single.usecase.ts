import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { tap } from "rxjs";
import { env } from "../../../../env/env";
import { Excursao } from "../../../shared/models/excursao.type";

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
    return this._http
      .get<Excursao>(`${env.API}/excursao/find/${id}`)
      .pipe(tap((data) => this._excursao.set(data)));
  }
}
