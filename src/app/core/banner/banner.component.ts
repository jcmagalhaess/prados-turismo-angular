import { CommonModule } from "@angular/common";
import { Component, computed } from "@angular/core";
import { BannerUsecase } from "./banner.usecase";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss",
})
export class BannerComponent {
  public slides = computed(() => {
    if (!this._usecase.slides()) return [];

    return JSON.parse(this._usecase.slides().configuracao);
  });

  constructor(private readonly _usecase: BannerUsecase) {
    this._usecase.carregarSlides();
  }
}
