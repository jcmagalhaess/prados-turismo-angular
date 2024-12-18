import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../env/env';
import { PagarmeLinkRequestBody } from '../../shared/models/pagarme.type';

@Injectable({
  providedIn: 'root'
})
export class PagarMeService {
  private _apiUrl = env.pagarmeApiUrl;
  private _apiKey = env.pagarmeApiKey;

  constructor(private http: HttpClient) { }

  generatePaymentLink(data: PagarmeLinkRequestBody): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this._apiUrl}/paymentlinks`, data, { headers });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Basic ${btoa(this._apiKey + ':')}`,
      'Content-Type': 'application/json'
    });
  }
}