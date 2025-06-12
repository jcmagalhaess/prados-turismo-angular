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
      subtitle: "Suporte 24h durante toda a viagem.",
      icon: "fa-brands fa-whatsapp",
    },
    {
      title: "Programa de fidelidade",
      subtitle:
        "Acumule viagens e ganhe benefícios com o programa de fidelidade da Familia Prados.",
      icon: "fa-solid fa-trophy",
    },
    {
      title: "Melhor custo-benefício",
      subtitle:
        "Nossos roteiros são pensados em aproveitar o máximo pagando pouco.",
      icon: "fa-brands fa-whatsapp",
    },
    {
      title: "Acompanhante",
      subtitle:
        "Acompanhamento presencial de um representante da Prados durante a viagem.",
      icon: "fa-brands fa-whatsapp",
    },
    {
      title: "Grupo no whatsapp",
      subtitle: "Grupo de viagem no Whatsapp para passar dicas e informações.",
      icon: "fa-solid fa-trophy",
    },
    {
      title: "Site seguro",
      subtitle: "Nosso site é totalmente seguro para pagamentos online.",
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
