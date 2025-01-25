import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { env } from "../../../env/env";

@Injectable({
    providedIn: 'root'
})
export class ReservaService {
    constructor(private _http: HttpClient) {}

    public consultarReserva(id: string) {
        return lastValueFrom(this._http.get(`${env.API}/reserva/find/${id}`))
    }

    public downloadVoucher(id: string) {
        return lastValueFrom(this._http.get(`${env.API}/reserva/download-voucher-reserva/${id}`))
    }
}