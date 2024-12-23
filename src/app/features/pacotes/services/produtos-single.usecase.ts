import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";
import { ExcursaoProduto } from "../../../shared/models/excursao.type";

@Injectable({
  providedIn: "root",
})
export class ProdutosSingleUsecase {
  private _produtos = signal<ExcursaoProduto | null>(null);

  get produto() {
    return this._produtos;
  }

  constructor(private readonly _http: HttpClient) {}

  public getProdutoById(id: string) {
    return lastValueFrom(
      this._http
        .get<ExcursaoProduto>(`${env.API}/produtos/find/${id}`)
        .pipe(tap((data) => this._produtos.set(data)))
    );
  }
}
