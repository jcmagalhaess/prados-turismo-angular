import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize, lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
  providedIn: "root",
})
export class AcessoChangePasswordUsecase {
  private _loading = signal<boolean>(false);

  get loading() {
    return this._loading();
  }

  constructor(private readonly _http: HttpClient) {}

  public changePassword(body: any) {
    this._loading.set(true);

    return lastValueFrom(
      this._http
        .patch(
          `${env.API}/usuarios/change-password/${localStorage.getItem(
            "clientToken"
          )}`,
          body
        )
        .pipe(finalize(() => this._loading.set(false)))
    );
  }
}
