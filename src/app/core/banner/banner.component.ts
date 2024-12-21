import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { BannerUsecase } from "./banner.usecase";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss"
})
export class BannerComponent {
  // public slides = computed(() => this._usecase.slides().map((item: any) => item.configuracao))
  slides = signal<any>([
    { src: 'assets/images/fortaleza.webp', alt: 'Fortaleza' },
    { src: 'assets/images/tiangua.webp', alt: 'Tianguá' },
  ])
  
  constructor(private readonly _usecase: BannerUsecase) {
    this._usecase.carregarSlides();
  }

  public carregarBanners() {
  }
}
