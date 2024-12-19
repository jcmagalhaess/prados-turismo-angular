import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
    providedIn: 'root'
})
export class AcessoLoginClientUsecase {
    private _loading = signal<boolean>(false);
    private _clientAuthenticated = signal<any>(null);
    
    get loading() {
        return this._loading();
    }

    get clientAuthenticated() {
        return this._clientAuthenticated();
    }

    get isAuthenticated() {
        return !!localStorage.getItem("clientToken");
    }
    
    constructor(
        private readonly _http: HttpClient,
        private readonly _router: Router
    ) { }

    public login(login: any) {
        this._loading.set(true);

        return lastValueFrom(
            this._http
                .post(`${ env.API }/usuarios/login-user-client`, login)
                .pipe(
                    tap((response: any) => this._clientAuthenticated.set(response)),
                    tap((response: any) => localStorage.setItem("clientSession", JSON.stringify(response))),
                    finalize(() => this._loading.set(false))
                )
        ).then((response: any) => {
            localStorage.setItem("clientToken", response.id);
        });
    }

    public logout() {
        localStorage.removeItem("clientToken");
        localStorage.removeItem("clientSession");
        this._clientAuthenticated.set(null);

        this._router.navigateByUrl('/login');
    }

    public carregarUsuario() {
        if (!this.isAuthenticated) this._clientAuthenticated.set(null);
        return this._clientAuthenticated.set(JSON.parse(localStorage.getItem("clientSession")!));
    }
}