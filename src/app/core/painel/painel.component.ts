import { CommonModule } from "@angular/common";
import { Component, computed } from "@angular/core";
import { RouterModule } from "@angular/router";
import { benefitsList } from "../../features/fidelidade/services/fidelidade.entity";
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";

@Component({
  selector: "app-painel",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./painel.component.html",
  styleUrl: "./painel.component.scss",
})
export class PainelComponent {
  public qtdViagens = computed(() =>
    this._formartNumber(this.client()?.Reservas.length || 0)
  );

  public rankingName = computed(() => {
    const ranking = this.client()?.Ranking;
    return ranking ? ranking.nome : "Sem Ranking";
  });

  get client() {
    return this._userClient.clientAuthenticated;
  }

  constructor(private readonly _userClient: AcessoGetDataPessoaUsecase) {}

  private _formartNumber(value: number): string {
    return value.toString().padStart(2, "0");
  }

  public pegarBeneficios(rankingName: string): string[] {
    const benefit = benefitsList.find(
      (benefit) => benefit.nome === rankingName
    );
    return benefit ? benefit.beneficios : [];
  }
}
