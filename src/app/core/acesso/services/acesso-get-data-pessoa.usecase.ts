import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";
import { Cliente } from "../../../shared/models/cliente.type";

@Injectable({
  providedIn: "root",
})
export class AcessoGetDataPessoaUsecase {
  private _loading = signal<boolean>(false);
  private _clientAuthenticated = signal<Cliente | null>(null);

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

  public logout() {
    this._clientAuthenticated.set(null);
    localStorage.removeItem("userClient");
  }
}
