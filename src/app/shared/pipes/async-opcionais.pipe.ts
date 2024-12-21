import { HttpClient } from "@angular/common/http";
import { inject, Pipe, PipeTransform } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { env } from "../../../env/env";
import { ExcursaoLocalEmbarque } from "../models/excursao.type";

@Pipe({
  name: "asyncOpcionais",
  standalone: true,
  pure: false, // IMPORTANTE: Torna o pipe impuro para detectar mudanças
})
export class AsyncOpcionaisPipe implements PipeTransform {
  private _http = inject(HttpClient);
  private _cachedValue: string = '';
  private _cachedObservable = new Observable<string>();

  public transform(value: string): Observable<string> {
    if (this._cachedValue !== value) {
      this._cachedValue = value;
      this._cachedObservable = of(value).pipe(
        switchMap(val => this._http.get<ExcursaoLocalEmbarque>(`${ env.API }/produtos/find/${val}`)),
        switchMap(data => of(`${data.nome}`))
      );
    }
    return this._cachedObservable;
  }
}
