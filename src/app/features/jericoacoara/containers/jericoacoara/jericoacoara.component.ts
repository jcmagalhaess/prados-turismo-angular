import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { Lightbox, LightboxModule } from "ngx-lightbox";
import { env } from "../../../../../env/env";
import { JericoacoaraSidebarComponent } from "../../components/jericoacoara-sidebar/jericoacoara-sidebar.component";

@Component({
    selector: "app-jericoacoara",
    imports: [CommonModule, CurrencyPipe, JericoacoaraSidebarComponent, LightboxModule],
    standalone: true,
    templateUrl: "./jericoacoara.component.html",
    styleUrl: "./jericoacoara.component.scss"
})
export class JericoacoaraComponent {
  public whatsappLink = env.WHATSAPP_LINK;
  public inclusos = signal<string[]>([
    "Ida e volta saindo de Fortaleza-CE;",
    "Acomodação com ar-condicionado, TV, frigobar e banheiro privativo;",
    "Café da manhã;",
    "Passeio para Lagun Beach (entrada inclusa)",
    "Passeio para o Buraco Azul (entrada inclusa)",
    "Passeio para lagoa do paraíso (barraca The Alchymist Beach Club – entrada inclusa)",
    "Passeio para pedra furada (caminhada ecológica) e árvore da preguiça;",
  ]);

  public gallery = signal<string[]>([
    "/assets/images/jeri/12.webp",
    "/assets/images/jeri/13.webp",
    "/assets/images/jeri/14.webp",
    "/assets/images/jeri/15.webp",
    "/assets/images/jeri/16.webp",
    "/assets/images/jeri/17.webp",
    "/assets/images/jeri/18.webp",
    "/assets/images/jeri/19.webp",
    "/assets/images/jeri/20.webp",
    "/assets/images/jeri/21.webp",
    "/assets/images/jeri/22.webp",
    "/assets/images/jeri/23.webp",
  ]);

  constructor(private readonly _lightbox: Lightbox) {}

  public formatGallery(images: string[]) {
    return images.map((image) => ({
      src: image,
      caption: image.split("/")[4],
      thumb: image,
    }));
  }

  public open(list: any, index: number): void {
    this._lightbox.open(list, index);
  }
}
