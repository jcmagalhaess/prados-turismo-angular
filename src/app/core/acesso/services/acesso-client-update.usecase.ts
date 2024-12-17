import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { finalize, lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";
import { Client } from "../../../shared/models/client.type";

@Injectable({
    providedIn: 'root'
})
export class AcessoClientUpdateUsecase {
    private _loading = signal<boolean>(false);
    private _clientAuthenticated = signal<Client | null>(null);
    
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
        private readonly _router: Router
    ) { }

    public updateUser(body: any) {
        this._loading.set(true);

        return lastValueFrom(
            this._http
                .put(`${ env.API }/usuarios/update/${ localStorage.getItem("clientToken") }`, body)
                .pipe(finalize(() => this._loading.set(false)))
        );
    }
}