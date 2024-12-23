import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";
import { Usuario } from "../../../shared/models/usuario.type";

@Injectable({
    providedIn: 'root'
})
export class AcessoClientAuthenticatedUsecase {
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
        private readonly _router: Router
    ) { }

    public login() {
        this._loading.set(true);

        return lastValueFrom(
            this._http
                .get(`${ env.API }/usuarios/find/${ localStorage.getItem("clientToken") }`)
                .pipe(
                    tap(console.log),
                    tap((response: any) => this._clientAuthenticated.set(response)),
                    finalize(() => this._loading.set(false))
                )
        );
    }

    public logout() {
        localStorage.removeItem("clientToken");
        this._clientAuthenticated.set(null);

        this._router.navigate(['/login']);
    }
}