import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";

export type CupomDTO = {
    id:string
    nome: string
    ativo: boolean
    desconto: number
    dataInicio: string
    dataFim: string
    quantidade: number
    usuariosId: string
}

@Injectable({
    providedIn: 'root'
})
export class CupomUsecase {
    public loading = signal<boolean>(false);
    
    constructor(private readonly _http: HttpClient) {}

    public validateCupom(cupom: string): Promise<CupomDTO> {
        this.loading.set(true);
        return lastValueFrom(this._http.get<any>(`${env.API}/cupons/find/${btoa(cupom)}`)).finally(() => this.loading.set(false));
    }
}