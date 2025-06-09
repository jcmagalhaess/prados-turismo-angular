import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { BannerUsecase } from "./banner.usecase";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss",
})
export class BannerComponent {
  public slides = signal([
    {
      title: "Suporte 24h",
      subtitle: "Durante sua viagem",
      icon: "fa-brands fa-whatsapp",
    },
    {
      title: "Acumule viagens",
      subtitle: "e ganhe benefícios",
      icon: "fa-solid fa-trophy",
    },
    {
      title: "Site seguro",
      icon: "fa-solid fa-shield",
    },
  ]);

  public familiaPrados = computed(() => {
    if (!this._usecase.slides()) return [];

    return JSON.parse(this._usecase.slides().configuracao);
  });

  constructor(private readonly _usecase: BannerUsecase) {
    this._usecase.carregarSlides();
  }
}
