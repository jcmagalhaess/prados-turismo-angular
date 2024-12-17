import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { lastValueFrom, map, tap } from "rxjs";
import { env } from "../../../../env/env";
import { EnumType } from "../../../shared/models/global.type";
import { Pacotes } from "../../../shared/models/pacotes.type";

@Injectable({
  providedIn: "root",
})
export class ExcursoesDestinosUsecase {
  private _destinos = signal<EnumType<string>[]>([]);

  get destinos() {
    return this._destinos();
  }

  constructor(private readonly _http: HttpClient) {}

  public getDestinos() {
    return lastValueFrom(
      this._http.get<Pacotes[]>(`${env.API}/pacotes/findAll`).pipe(
        map((response: Pacotes[]) =>
          response.map((pct) => ({
            key: pct.id,
            value: pct.nome,
          }))
        ),
        tap((response: any) => this._destinos.set(response))
      )
    );
  }
}
