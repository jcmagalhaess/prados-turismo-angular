import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AcessoLoginClientUsecase } from "../acesso/services/acesso-login-client.usecase";

@Component({
    selector: "app-minha-conta",
    imports: [CommonModule, RouterModule],
    standalone: true,
    templateUrl: "./minha-conta.component.html",
    styleUrl: "./minha-conta.component.scss"
})
export class MinhaContaComponent {
  public menu = [
    {
      label: "Painel",
      route: "/minha-conta/painel",
      icon: "fa-solid fa-solar-panel",
    },
    {
      label: "Sua conta",
      route: "/minha-conta/perfil",
      icon: "fa-solid fa-id-badge",
    },
    {
      label: "Suas viagens",
      route: "/minha-conta/pedidos",
      icon: "fa-solid fa-person-walking-luggage",
    },
    {
      label: "Próxima categoria",
      route: "/programa-de-fidelidade",
      icon: "fa-solid fa-arrow-right",
    },
    {
      label: "Documentos de viagem",
      route: "/documentos-viagem",
      icon: "fa-solid fa-passport",
    },
    {
      label: "Formas de pagamento",
      route: "/formas-pagamento",
      icon: "fa-solid fa-cash-register",
    },
  ];

  constructor(private readonly _client: AcessoLoginClientUsecase) {}

  public logout() {
    this._client.logout();
  }
}
