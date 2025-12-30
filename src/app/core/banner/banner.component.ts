import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { BannerUsecase } from "./banner.usecase";

@Component({
  selector: "app-banner",
  imports: [CommonModule],
  standalone: true,
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss",
})
export class BannerComponent {
  public slides = signal([
    {
      title: "Suporte 24h",
      subtitle: "Suporte 24h durante toda a viagem.",
      icon: "suporte-24h.png",
    },
    {
      title: "Programa de fidelidade",
      subtitle:
        "Acumule viagens e ganhe benefícios com o programa de fidelidade da Familia Prados.",
      icon: "programa-fidelidade.png",
    },
    {
      title: "Melhor custo-benefício",
      subtitle:
        "Nossos roteiros são pensados em aproveitar o máximo pagando pouco.",
      icon: "custo-beneficio.png",
    },
    {
      title: "Acompanhamento",
      subtitle:
        "Acompanhamento presencial de um representante da Prados durante a viagem.",
      icon: "acompanhamento.png",
    },
    {
      title: "Grupo no whatsapp",
      subtitle: "Grupo de viagem no Whatsapp para passar dicas e informações.",
      icon: "whatsapp.png",
    },
    {
      title: "Site seguro",
      subtitle: "Nosso site é totalmente seguro para pagamentos online.",
      icon: "site-seguro.png",
    },
  ]);

  public familiaPrados = computed(() => {
    if (!this._usecase.slides()) return [];

    return JSON.parse(this._usecase.slides().configuracao);
  });

  constructor(
    private readonly _usecase: BannerUsecase,
    private readonly _sanitizer: DomSanitizer
  ) {
    this._usecase.carregarSlides();
  }
}
