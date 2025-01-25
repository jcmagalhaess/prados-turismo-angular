import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { Swiper } from 'swiper';
import 'swiper/css'; // Importa estilos gerais
import 'swiper/css/navigation'; // Estilos específicos para navegação
import 'swiper/css/thumbs'; // Estilos para os thumbs
import { Navigation, Thumbs } from 'swiper/modules';
import { formatarData } from '../../../../shared/helpers/formatar-data.helper';
import { ExcursaoImagem } from '../../../../shared/models/excursao.type';
import { PacotesSidebarComponent } from '../../components/pacotes-sidebar/pacotes-sidebar.component';
import { ExcursoesSingleUsecase } from '../../services/excursoes-single.usecase';

Swiper.use([Navigation, Thumbs]);

@Component({
  selector: 'app-pacotes-single',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, LightboxModule, PacotesSidebarComponent],
  templateUrl: './pacotes-single.component.html',
  styleUrl: './pacotes-single.component.scss',
  providers: [Lightbox, ExcursoesSingleUsecase]
})
export class PacotesSingleComponent implements AfterViewInit {
  public form = new FormGroup({
    period: new FormControl('', Validators.required),
    tickets: new FormControl('', Validators.required),
  })
  get excursao() {
    return this._service.excursao;
  }

  get inclusos() {
    return computed(() => this.excursao()?.Pacotes.Inclusos);
  }

  get opcionais() {
    return computed(() => this.excursao()?.Pacotes.Produto)
  }

  get noOpcionais() {
    return computed(() => this.opcionais()?.length === 0)
  }

  get isJeri() {
    return computed(() => this.excursao()?.nome.includes('Jericoacoara') ?? false);
  }
  
  constructor(
    private readonly _service: ExcursoesSingleUsecase,
    private readonly _router: ActivatedRoute,
    private readonly _lightbox: Lightbox
  ) {
    this._service.getExcursaoById(this._router.snapshot.params['id']);

    effect(() => {
      this.form.controls['period'].setValue(this.formatandoPeriodo(this.excursao()?.dataInicio!, this.excursao()?.dataFim!));
    })
  }

  public ngAfterViewInit(): void {
    const thumbsSwiper = new Swiper('.mySwiper', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    // Inicialize o Swiper principal e conecte os thumbs
    const mainSwiper = new Swiper('.mySwiper2', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: thumbsSwiper, // Conecta os thumbs ao principal
      },
    });
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
    return `${formatarData(new Date(dataInicio))} à ${formatarData(new Date(dataFim))}`;
  }
  
  private _buildItensInclusos(itens: Array<any>) {
      let itensFilted = itens.filter(item => item !== '');
  
      return itensFilted;
  }
}
