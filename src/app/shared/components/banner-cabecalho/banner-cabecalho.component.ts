import { NgStyle } from "@angular/common";
import { Component, HostListener, input } from "@angular/core";

@Component({
  selector: "app-banner-cabecalho",
  standalone: true,
  imports: [NgStyle],
  templateUrl: "./banner-cabecalho.component.html",
  styleUrl: "./banner-cabecalho.component.scss",
})
export class BannerCabecalhoComponent {
  public titulo = input<string>();
  public background = input<string>();

  backgroundPosition: number = 0;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.backgroundPosition = scrollY * 0.4; // quanto menor o número, mais "delay"
  }
}
