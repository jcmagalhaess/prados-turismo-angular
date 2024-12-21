import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";
import { AcessoGetDataPessoaUsecase } from "./acesso-get-data-pessoa.usecase";

@Injectable({
  providedIn: "root",
})
export class AcessoLoginClientUsecase {
  private _loading = signal<boolean>(false);
  private _clientAuthenticated = signal<any>(null);
  private _dataCache = signal<any>(null);
  private _userClient = signal<any>(null);

  get loading() {
    return this._loading();
  }

  get clientAuthenticated() {
    return this._clientAuthenticated;
  }

  get isAuthenticated() {
    return !!localStorage.getItem("clientToken");
  }

  get dataCache() {
    return this._dataCache();
  }

  get userClient() {
    return this._userClient;
  }

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _getUserClient: AcessoGetDataPessoaUsecase
  ) {}

  public login(login: any) {
    this._loading.set(true);
    this._dataCache.set(login);

    return lastValueFrom(
      this._http.post(`${env.API}/usuarios/login-user-client`, login).pipe(
        tap((response: any) => this._clientAuthenticated.set(response)),
        tap((response: any) => localStorage.setItem("clientSession", JSON.stringify(response))),
        tap((response: any) => {
          let userClient = response.PessoaVinculada.find(
            (item: any) => item.email === response.email
          )!.id;

          localStorage.setItem("userClient", userClient);
          this._userClient.set(userClient);
        }),
        tap((response: any) => localStorage.setItem("clientToken", response.id)),
        finalize(() => this._loading.set(false))
      )
    )
  }

  public logout() {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientSession");
    localStorage.removeItem("userClient");
    this._clientAuthenticated.set(null);
    this._getUserClient.logout();

    this._router.navigateByUrl("/login");
  }

  public carregarUsuario() {
    if (!this.isAuthenticated) this._clientAuthenticated.set(null);
    return this._clientAuthenticated.set(
      JSON.parse(localStorage.getItem("clientSession")!)
    );
  }
}
