import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
  providedIn: "root",
})
export class AuthMasterService {
  private _token = signal<string | null>(null);
  private _hasToken = computed(() => this._token() !== null);
  public loadingMaster = signal<boolean>(false);

  // Token expiration time in milliseconds (default: 24 hours)
  private readonly TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

  get hasToken() {
    return this._hasToken;
  }

  constructor(private readonly _http: HttpClient) {}

  public authenticationMaster(): Promise<any> {
    const token = localStorage.getItem("authToken");
    const tokenExpiration = localStorage.getItem("authTokenExpiration");

    if (token && tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      const currentTime = Date.now();

      // Check if token is still valid
      if (currentTime < expirationTime) {
        this._token.set(token);
        return Promise.resolve();
      } else {
        // Token expired, clear it
        this.clearToken();
      }
    }

    return this._authenticationMasterToken();
  }

  private _authenticationMasterToken() {
    this.loadingMaster.set(true);
    return lastValueFrom(
      this._http
        .post(`${env.API}/usuarios/auth`, {
          username: "PradosAdmin",
          password: "@pradosAdmin",
        })
        .pipe(finalize(() => this.loadingMaster.set(false)))
    ).then((res: any) => {
      const expirationTime = Date.now() + this.TOKEN_EXPIRATION_TIME;

      this._token.set(res.token);
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("authTokenExpiration", expirationTime.toString());
      localStorage.setItem("userId", res.userId);
    });
  }

  private clearToken(): void {
    this._token.set(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
  }
}
