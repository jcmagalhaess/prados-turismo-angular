import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ExcursaoCardComponent } from '../../../../shared/components/excursao-card/excursao-card.component';
import { ExcursaoImagem } from '../../../../shared/models/excursao.type';
import { PacotesFilterComponent } from '../../components/pacotes-filter/pacotes-filter.component';
import { ExcursoesListUsecase } from '../../services/excursoes-list.usecase';

@Component({
  selector: 'app-pacotes-index',
  standalone: true,
  imports: [
    CommonModule,
    PacotesFilterComponent,
    ExcursaoCardComponent,
    MatProgressBarModule
  ],
  templateUrl: './pacotes-index.component.html',
  styleUrl: './pacotes-index.component.scss',
})
export class PacotesIndexComponent {
  get loading() {
    return this._excursoes.loading();
  }

  get excursoes() {
    return this._excursoes.excursoes();
  }

  constructor(
    private readonly _excursoes: ExcursoesListUsecase,
  ) {
    this.getFilter({});
  }

  public getFilter(value: any, ) {
    this._excursoes.getExcursoes(value);
  }

  public hasUrl(image: ExcursaoImagem) {
    if (!!image) return image.url;

    return '';
  }
}
