import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { env } from "../../../env/env";

@Injectable({
  providedIn: "root",
})
export class ReservaService {
  constructor(private _http: HttpClient) { }

  public consultarReserva(id: string) {
    return lastValueFrom(this._http.get(`${env.API}/reserva/find/${id}`));
  }

  public downloadVoucher(
    id: string
  ): any {
    return lastValueFrom(
      this._http.get(`${env.API}/reserva/download-voucher-reserva/${id}`, { responseType: 'blob' })
    ).then(res => {
      debugger

      const url = window.URL.createObjectURL(new Blob([res], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'voucher.pdf';
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      (link as any).body.removeChild(link);
    })
      .catch(err => console.log(err));
  }
}
