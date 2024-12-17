import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
    providedIn: 'root'
})
export class AcessoLoginClientUsecase {
    private _loading = signal<boolean>(false);
    private _clientAuthenticated  = signal<any>(null);
    
    get loading() {
        return this._loading();
    }

    get clientAuthenticated() {
        return this._clientAuthenticated();
    }
    
    constructor(private readonly _http: HttpClient) { }

    public login(login: any) {
        this._loading.set(true);

        return lastValueFrom(
            this._http
                .post(`${ env.API }/usuarios/login-user-client`, login)
                .pipe(
                    tap((response: any) => this._clientAuthenticated.set(response)),
                    finalize(() => this._loading.set(false))
                )
        ).then((response: any) => {
            localStorage.setItem("clientToken", response.id);
        });
    }
}