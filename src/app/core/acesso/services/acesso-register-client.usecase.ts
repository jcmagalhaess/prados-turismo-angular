import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom, tap } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
    providedIn: 'root'
})
export class AcessoRegisterClientUsecase {
    private _loading = signal<boolean>(false);
    private _client  = signal<any>(null);
    
    get loading() {
        return this._loading();
    }

    get client() {
        return this._client();
    }
    
    constructor(private readonly _http: HttpClient) { }

    public register(email: any) {
        this._loading.set(true);

        return lastValueFrom(
            this._http
                .post(`${ env.API }/usuarios/register-user-client`, email)
                .pipe(
                    tap((response: any) => this._client.set(response)),
                    finalize(() => this._loading.set(false))
                )
        );
    }
}