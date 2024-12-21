import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
  providedIn: "root",
})
export class AcessoGetDataPessoaUsecase {
  private _loading = signal<boolean>(false);
  private _clientAuthenticated = signal<any>(null);

  get loading() {
    return this._loading();
  }

  get clientAuthenticated() {
    return this._clientAuthenticated;
  }

  constructor(private readonly _http: HttpClient) {}

  public carregarCliente(userId: string) {
    this._loading.set(true);

    return lastValueFrom(
      this._http.get(`${env.API}/pessoas/get-data-pessoa/${userId}`).pipe(
        tap((response: any) => this._clientAuthenticated.set(response)),
        finalize(() => this._loading.set(false))
      )
    );
  }
}
