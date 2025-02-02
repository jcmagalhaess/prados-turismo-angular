import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
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
    RouterModule
  ],
  templateUrl: "./home-index.component.html",
  styleUrl: "./home-index.component.scss",
  providers: [ExcursoesListUsecase, HeaderStyleService]
})
export class HomeIndexComponent {
  get excursoes() {
    return this._excursoes.excursoes;
  }

  constructor(private readonly _excursoes: ExcursoesListUsecase) {
    this.getOrigem({ origem: '1', publicado: true });
  }

  public getOrigem(filtro: any) {
    this._excursoes.getExcursoes({ ...filtro, orderBy: "dataInicio", publicado: true });
  }

  public hasUrl(image: ExcursaoImagem) {
    if (!!image) return image.url;

    return "";
  }
}
