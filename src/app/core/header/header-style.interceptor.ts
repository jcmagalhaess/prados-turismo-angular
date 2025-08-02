import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { routes } from "../../app.routes";

@Injectable({
  providedIn: "root",
})
export class HeaderStyleService {
  private _renderer: Renderer2;
  private _animatedRoutes = ["/", "/faq", "/sobre-nos", "/formas-pagamento", "/politica-privacidade", "/termos-uso"]; // URLs que terão animação no scroll
  private _scrollListener: any = () => {}; // Para armazenar o listener de scroll

  constructor(private _router: Router, rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
    this._applyHeaderStyle("/");

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentPath = new URL(
          event.urlAfterRedirects,
          window.location.origin
        ).pathname;

        this._applyHeaderStyle(currentPath);
      });
  }

  private _applyHeaderStyle(url: string) {
    const header = document.getElementById("header");

    if (!header) return;

    if (this._animatedRoutes.includes(url)) {
      let routesMap = routes.map((item) => {
        if (item.path === "**") return "**";
        return "/" + item.path;
      });

      if (!routesMap.find((item) => item === url)) {
        this._cleanupScrollAnimation();
        this._renderer.addClass(header, "header--scrolled");
      } else {
        this._setupScrollAnimation(header);
      }
    } else {
      // Para a rota coringa ou outras não animadas, limpa animações e fixa o estilo
      this._cleanupScrollAnimation();
      this._renderer.addClass(header, "header--scrolled");
    }
  }

  private _setupScrollAnimation(header: HTMLElement) {
    // Remove o ouvinte anterior, se existir
    this._cleanupScrollAnimation();

    const scrollHandler = () => {
      if (window.scrollY > 50) {
        this._renderer.addClass(header, "header--scrolled");
      } else {
        this._renderer.removeClass(header, "header--scrolled");
      }
    };

    window.addEventListener("scroll", scrollHandler);
    this._scrollListener = () =>
      window.removeEventListener("scroll", scrollHandler);
  }

  private _cleanupScrollAnimation() {
    if (this._scrollListener) {
      this._scrollListener();
      this._scrollListener = null;
    }
  }
}
