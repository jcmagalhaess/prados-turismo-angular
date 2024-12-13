import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { AuthMasterService } from '../../../../core/auth/services/auth-master.service';
import { formatarData } from '../../../../shared/helpers/formatar-data.helper';
import { ExcursaoImagem } from '../../../../shared/models/excursao.type';
import { PacotesSidebarComponent } from '../../components/pacotes-sidebar/pacotes-sidebar.component';
import { ExcursoesSingleUsecase } from '../../services/excursoes-single.usecase';

@Component({
  selector: 'app-pacotes-single',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, LightboxModule, PacotesSidebarComponent],
  templateUrl: './pacotes-single.component.html',
  styleUrl: './pacotes-single.component.scss',
  providers: [Lightbox]
})
export class PacotesSingleComponent {
  get excursao() {
    return this._service.excursao;
  }
  
  constructor(
    private readonly _service: ExcursoesSingleUsecase,
    private readonly _authMaster: AuthMasterService,
    private readonly _router: ActivatedRoute,
    private readonly _lightbox: Lightbox
  ) {
    effect(() => {
      if (this._authMaster.hasToken) {
        this._service.getExcursaoById(this._router.snapshot.params['id']);
      }
    })
  }

  public hasUrl(image: ExcursaoImagem) {
    if (!!image) return image.url;

    return '';
  }

  public formatGallery(images: ExcursaoImagem[]) {
    return images.map((image) => ({
      src: image.url,
      caption: image.nome,
      thumb: image.url,
    }));
  }

  public open(list: any, index: number): void {
    this._lightbox.open(list, index);
  }

  public close(): void {
    this._lightbox.close();
  }

  public formatandoDescricao(description: string) {
    if (!description) return '';
    
    let splitDescription = description?.split('---');

    if (splitDescription[0].includes(';')) {
        return '';
    }

    return splitDescription[0];
  }

  public formatandoItensInclusos(description: string) {
    if (!description) return '';
    
    let splitDescription = description.split('---');

    if (splitDescription[0].includes(';')) {
        return this._buildItensInclusos(splitDescription[0].split(';'));
    }

    return this._buildItensInclusos(splitDescription[1].split(';'));
  }

  public formatandoPeriodo(dataInicio: string, dataFim: string) {
    return `${formatarData(new Date(dataInicio))} a ${formatarData(new Date(dataFim))}`;
  }
  
  private _buildItensInclusos(itens: Array<any>) {
      let itensFilted = itens.filter(item => item !== '');
  
      return itensFilted;
  }
}
