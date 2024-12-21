import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
  providedIn: "root",
})
export class AuthMasterService {
  private _token = signal<string | null>(null);
  private _hasToken = computed(() => this._token() !== null);

  get hasToken() {
    return this._hasToken;
  }
  
  constructor(private readonly _http: HttpClient) {}

  public authenticationMaster() {
    return this._authenticationMasterToken()
      .then((res: any) => {
        this._token.set(res.token);
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("userId", res.userId);
      });
  }

  private _authenticationMasterToken() {
    return lastValueFrom(
      this._http.post(`${env.API}/usuarios/auth`, {
        username: "PradosAdmin",
        password: "1234",
      })
    );
  }
}
