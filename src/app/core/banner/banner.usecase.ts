import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { lastValueFrom, tap } from "rxjs";
import { env } from "../../../env/env";

@Injectable({
  providedIn: "root",
})
export class BannerUsecase {
  public slides = signal<any>(null);
  
  constructor(private readonly _http: HttpClient) {}

  public carregarSlides() {
    return lastValueFrom(
      this._http
        .get(`${env.API}/configuracoes/findByType/default-slide-images`)
        .pipe(tap((response: any) => this.slides.set(response)))
    );
  }
}
