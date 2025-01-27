import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { env } from "../../../env/env";

@Injectable({
  providedIn: "root",
})
export class ReservaService {
  constructor(private _http: HttpClient) {}

  public consultarReserva(id: string) {
    return lastValueFrom(this._http.get(`${env.API}/reserva/find/${id}`));
  }

  public downloadVoucher(
    id: string
  ): Promise<HttpResponse<ArrayBuffer>> {
    return lastValueFrom(
      this._http.get(`${env.API}/reserva/download-voucher-reserva/${id}`, {
        observe: "response",
        responseType: "arraybuffer",
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Extraia a mensagem do erro
          const errorMessage =
            error.error?.message ||
            error.message ||
            'Erro desconhecido ao gerar o PDF';

          console.error('Erro na requisição:', errorMessage);

          // Lança o erro para ser tratado onde a função é chamada
          return throwError(() => new Error(errorMessage));
        })
      )
    );
  }
}
