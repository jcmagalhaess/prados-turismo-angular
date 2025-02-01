import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExcursoesListUsecase } from '../../features/pacotes/services/excursoes-list.usecase';
import { ExcursaoCardComponent } from '../../shared/components/excursao-card/excursao-card.component';
import { ExcursaoImagem } from '../../shared/models/excursao.type';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, ExcursaoCardComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
  providers: [ExcursoesListUsecase],
})
export class FeaturesComponent {
  get excursoes() {
    return this._excursoes.excursoes;
  }

  constructor(private readonly _excursoes: ExcursoesListUsecase) {
    this._excursoes.getExcursoes({ origem: '1', publicado: true, destacado: 'true', orderBy: "dataInicio"}, '2');
  }

  public hasUrl(image: ExcursaoImagem) {
    if (!!image) return image.url;

    return "";
  }
}
