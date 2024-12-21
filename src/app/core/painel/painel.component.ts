import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";

@Component({
  selector: "app-painel",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./painel.component.html",
  styleUrl: "./painel.component.scss",
})
export class PainelComponent {
  get client() {
    return this._userClient.clientAuthenticated();
  }

  constructor(private readonly _userClient: AcessoGetDataPessoaUsecase) {}
}
