import { HttpClient } from '@angular/common/http';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { ExcursoesSingleUsecase } from '../../features/pacotes/services/excursoes-single.usecase';

@Pipe({
  name: 'thumbnail',
  standalone: true,
  pure: false,
})
export class ThumbnailPipe implements PipeTransform {
  private _http = inject(HttpClient);
  private _excursao = inject(ExcursoesSingleUsecase);
  private _cachedValue: string = '';
  private _cachedObservable = new Observable<string>();

  public transform(value: string): Observable<string> {
    if (this._cachedValue !== value) {
      this._cachedValue = value;
      this._cachedObservable = of(value).pipe(
        switchMap(val => this._excursao.getExcursaoById(val)),
        switchMap(data => {
          if (!data.Pacotes?.Imagem?.url) return of('');
          return of(`url(${data.Pacotes?.Imagem?.url})`)
        })
      );
    }
    return this._cachedObservable;
  }
}
