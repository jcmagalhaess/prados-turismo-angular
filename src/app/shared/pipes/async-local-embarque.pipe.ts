import { HttpClient } from "@angular/common/http";
import { inject, Pipe, PipeTransform } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { env } from "../../../env/env";
import { ExcursaoLocalEmbarque } from "../models/excursao.type";

@Pipe({
  name: "asyncLocalEmbarque",
  standalone: true,
  pure: false, // IMPORTANTE: Torna o pipe impuro para detectar mudanças
})
export class AsyncLocalEmbarquePipe implements PipeTransform {
  private _http = inject(HttpClient);
  private _cachedValue: string = '';
  private _cachedObservable = new Observable<string>();

  public transform(value: any, formated: boolean = false): Observable<string> {
    if (formated) return of(`${value.horaEmbarque} - ${value.nome}`);
    if (this._cachedValue !== value) {
      this._cachedValue = value;
      this._cachedObservable = of(value).pipe(
        switchMap(val => this._http.get<ExcursaoLocalEmbarque>(`${ env.API }/local-embarque/find/${val}`)),
        switchMap(data => of(`${data.horaEmbarque} - ${data.nome}`))
      );
    }
    return this._cachedObservable;
  }
}
