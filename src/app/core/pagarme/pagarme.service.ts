import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '../../../env/env';
import { Observable } from 'rxjs';
import { PagarmeLinkRequestBody } from '../../shared/models/pagarme.type';

@Injectable({
  providedIn: 'root'
})
export class PagarMeService {
  private apiUrl = env.pagarmeApiUrl;
  private apiKey = env.pagarmeApiKey;

  constructor(private http: HttpClient) { }

  generatePaymentLink(data: PagarmeLinkRequestBody): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/paymentlinks`, data, { headers });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Basic ${btoa(this.apiKey + ':')}`,
      'Content-Type': 'application/json'
    });
  }
}