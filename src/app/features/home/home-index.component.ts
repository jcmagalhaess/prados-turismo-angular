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
import { PacotesFilterComponent } from "../pacotes/components/pacotes-filter/pacotes-filter.component";
import { ExcursoesListUsecase } from "../pacotes/services/excursoes-list.usecase";

@Component({
  selector: "app-home-index",
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    FeaturesComponent,
    ExcursaoCardComponent,
    PacotesFilterComponent,
    RouterModule,
  ],
  templateUrl: "./home-index.component.html",
  styleUrl: "./home-index.component.scss",
  providers: [ExcursoesListUsecase, HeaderStyleService],
})
export class HomeIndexComponent implements AfterViewInit, OnDestroy {
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

  ngAfterViewInit() {
    // this.scroll = new LocomotiveScroll({
    //   el: document.querySelector("[data-scroll-container]") as HTMLElement,
    //   smooth: true,
    //   lerp: 0.05, // menor = mais suave (0.05 a 0.1 costuma ser bom)
    // });
  }

  ngOnDestroy() {
    // if (this.scroll) {
    //   this.scroll.destroy();
    // }
  }
}
