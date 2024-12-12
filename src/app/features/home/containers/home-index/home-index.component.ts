import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { AuthMasterService } from '../../../../core/auth/services/auth-master.service';
import { BannerComponent } from '../../../../core/banner/banner.component';
import { FeaturesComponent } from '../../../../core/features/features.component';
import { ExcursaoCardComponent } from '../../../../shared/components/excursao-card/excursao-card.component';
import { ExcursaoImagem } from '../../../../shared/models/excursao.type';
import { ExcursoesUsecase } from '../../services/excursoes.usecase';

@Component({
  selector: 'app-home-index',
  standalone: true,
  imports: [CommonModule, BannerComponent, FeaturesComponent, ExcursaoCardComponent],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.scss',
})
export class HomeIndexComponent {
  get excursoes() {
    return this._excursoes.listaExcursoes;
  }
  
  constructor(
    private readonly _excursoes: ExcursoesUsecase,
    private readonly _authMaster: AuthMasterService
  ) {
    effect(() => {
      if (this._authMaster.hasToken) {
        this._excursoes.getExcursoes();
      }
    })
  }

  public hasUrl(image: ExcursaoImagem) {
    if (!!image) return image.url;

    return '';
  }
}
