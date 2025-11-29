import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom } from "rxjs";
import { env } from "../../../env/env";
import { IPagBankRequestBody } from "../../shared/models/pagbank.type";

@Injectable({
  providedIn: "root",
})
export class PagBankService {
  private _apiUrl = env.API;
  private _loading = signal<boolean>(false);

  get loading() {
    return this._loading;
  }

  constructor(private http: HttpClient) {}

  generatePaymentLink(data: IPagBankRequestBody): Promise<any> {
    this._loading.set(true);
    return lastValueFrom(
      this.http
        .post(`${this._apiUrl}/financeiro/pagbank-payment-link`, data, {
          responseType: "json"
        })
        .pipe(finalize(() => this._loading.set(false)))
    );
  }
}
