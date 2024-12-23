import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";
import { Usuario } from "../../../shared/models/usuario.type";

@Injectable({
    providedIn: 'root'
})
export class AcessoClientUpdateUsecase {
    private _loading = signal<boolean>(false);
    private _clientAuthenticated = signal<Usuario | null>(null);
    
    get loading() {
        return this._loading();
    }

    get clientAuthenticated() {
        return this._clientAuthenticated;
    }

    get isAuthenticated() {
        return !!localStorage.getItem("clientToken");
    }
    
    constructor(
        private readonly _http: HttpClient,
    ) { }

    public updateUser(body: any) {
        this._loading.set(true);

        return lastValueFrom(
            this._http
                .put(`${ env.API }/pessoas/update/${ localStorage.getItem("userClient") }`, body)
                .pipe(finalize(() => this._loading.set(false)))
        );
    }
}