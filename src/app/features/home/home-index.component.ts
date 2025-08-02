import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import LocomotiveScroll from "locomotive-scroll";
import { BannerComponent } from "../../core/banner/banner.component";
import { FeaturesComponent } from "../../core/features/features.component";
import { HeaderStyleService } from "../../core/header/header-style.interceptor";
import { ExcursaoCardComponent } from "../../shared/components/excursao-card/excursao-card.component";
import { ExcursaoImagem } from "../../shared/models/excursao.type";
import { DepoimentosComponent } from "../depoimentos/depoimentos.component";
import { PacotesFilterComponent } from "../pacotes/components/pacotes-filter/pacotes-filter.component";
import { ExcursoesListUsecase } from "../pacotes/services/excursoes-list.usecase";

@Component({
    selector: "app-home-index",
    imports: [
        CommonModule,
        BannerComponent,
        FeaturesComponent,
        ExcursaoCardComponent,
        PacotesFilterComponent,
        RouterModule,
        DepoimentosComponent,
    ],
    standalone: true,
    templateUrl: "./home-index.component.html",
    styleUrl: "./home-index.component.scss",
    providers: [ExcursoesListUsecase, HeaderStyleService]
})
export class HomeIndexComponent {
  private scroll!: LocomotiveScroll;
  backgroundPosition = 0;
  get excursoes() {
    return this._excursoes.excursoes;
  }

  constructor(private readonly _excursoes: ExcursoesListUsecase) {
    this.getOrigem({ origem: "1" });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.backgroundPosition = scrollY * 0.4; // quanto menor o número, mais "delay"
  }

  public getOrigem(filtro: any) {
    this._excursoes.getExcursoes({
      ...filtro,
      orderBy: "dataInicio",
      publicado: true,
    });
  }

  public hasUrl(image: ExcursaoImagem) {
    if (!!image) return image.url;

    return "";
  }
}
