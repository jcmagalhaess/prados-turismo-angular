import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom } from "rxjs";
import { env } from "../../../env/env";
import { PagarmeLinkRequestBody } from "../../shared/models/pagarme.type";

@Injectable({
  providedIn: "root",
})
export class PagarMeService {
  private _apiUrl = env.API;
  private _apiKey = env.pagarmeApiKey;
  private _loading = signal<boolean>(false);

  get loading() {
    return this._loading;
  }

  constructor(private http: HttpClient) {}

  generatePaymentLink(data: PagarmeLinkRequestBody): Promise<any> {
    this._loading.set(true);
    const headers = this.getHeaders();
    return lastValueFrom(
      this.http
        .post(`${this._apiUrl}/financeiro/pagarme-payment-link`, data, { responseType: "text" as "json" })
        .pipe(finalize(() => this._loading.set(false)))
    );
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Basic ${btoa(this._apiKey + ":")}`,
      "Content-Type": "application/json",
    });
  }
}
