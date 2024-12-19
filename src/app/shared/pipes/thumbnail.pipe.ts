import { HttpClient } from '@angular/common/http';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { env } from '../../../env/env';
import { Excursao } from '../models/excursao.type';

@Pipe({
  name: 'thumbnail',
  standalone: true,
  pure: false,
})
export class ThumbnailPipe implements PipeTransform {
  private _http = inject(HttpClient);
  private _cachedValue: string = '';
  private _cachedObservable = new Observable<string>();

  public transform(value: string): Observable<string> {
    if (this._cachedValue !== value) {
      this._cachedValue = value;
      this._cachedObservable = of(value).pipe(
        switchMap(val => this._http.get<Excursao>(`${ env.API }/excursao/find/${val}`)),
        switchMap(data => of(`url(${data.Pacotes?.Imagem?.url})`))
      );
    }
    return this._cachedObservable;
  }
}
