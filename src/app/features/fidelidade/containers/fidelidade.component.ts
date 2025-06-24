import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { BannerCabecalhoComponent } from "../../../shared/components/banner-cabecalho/banner-cabecalho.component";
import { FidelidadeBeneficioComponent } from "../components/fidelidade-beneficio/fidelidade-beneficio.component";
import { RankingsUsecase } from "../services/rankings.usecase";

@Component({
  selector: "app-fidelidade",
  standalone: true,
  imports: [BannerCabecalhoComponent, FidelidadeBeneficioComponent, JsonPipe],
  templateUrl: "./fidelidade.component.html",
  styleUrl: "./fidelidade.component.scss",
})
export class FidelidadeComponent {
  public titulo = `Viajar com a <strong>Prados Turismo</strong> garante recompensas incríveis!`;

  // public beneficios: RankingsList[] = [
  //   {
  //     id: "15e02686-1662-40de-813b-c2e38ce51a08",
  //     nome: "CLASSIC",
  //     qtdViagens: {
  //       qtdMinViagens: 1,
  //       qtdMaxViagens: 1,
  //     },
  //     dataCadastro: "2025-06-24T12:47:18.799Z",
  //     usuariosId: "005e3fc4-e584-4adb-ba69-f3c80c511853",
  //     beneficios: ["Desconto em viagens", "Acesso a promoções exclusivas"],
  //     urlImagem: "../../../../assets/images/fidelidade-classic.png",
  //   },
  //   {
  //     id: "d90ffaf9-6225-4f74-a438-c9d5dc88c27c",
  //     nome: "SILVER",
  //     qtdViagens: {
  //       qtdMinViagens: 2,
  //       qtdMaxViagens: 2,
  //     },
  //     dataCadastro: "2025-06-24T12:47:28.034Z",
  //     usuariosId: "005e3fc4-e584-4adb-ba69-f3c80c511853",
  //     beneficios: [
  //       "Desconto em viagens",
  //       "Acesso a promoções exclusivas",
  //       "Prioridade em reservas",
  //     ],
  //     urlImagem: "../../../../assets/images/fidelidade-silver.png",
  //   },
  //   {
  //     id: "da615754-bdd4-478c-915d-ccfbae8001cf",
  //     nome: "GOLD",
  //     qtdViagens: {
  //       qtdMinViagens: 3,
  //       qtdMaxViagens: 5,
  //     },
  //     dataCadastro: "2025-06-24T12:47:34.762Z",
  //     usuariosId: "005e3fc4-e584-4adb-ba69-f3c80c511853",
  //     beneficios: [
  //       "Desconto em viagens",
  //       "Acesso a promoções exclusivas",
  //       "Prioridade em reservas",
  //       "Brinde especial",
  //     ],
  //     urlImagem: "../../../../assets/images/fidelidade-gold.png",
  //   },
  //   {
  //     id: "feab443b-d1ce-4b01-aa92-2a8350c8fbea",
  //     nome: "PLATINUM",
  //     qtdViagens: {
  //       qtdMinViagens: 6,
  //       qtdMaxViagens: 8,
  //     },
  //     dataCadastro: "2025-06-24T12:47:48.869Z",
  //     usuariosId: "005e3fc4-e584-4adb-ba69-f3c80c511853",
  //     beneficios: [
  //       "Desconto em viagens",
  //       "Acesso a promoções exclusivas",
  //       "Prioridade em reservas",
  //       "Brinde especial",
  //       "Upgrade de categoria",
  //     ],
  //     urlImagem: "../../../../assets/images/fidelidade-platinum.png",
  //   },
  //   {
  //     id: "58fe4f54-f565-4954-9d95-2ceae2a87069",
  //     nome: "BLACK",
  //     qtdViagens: {
  //       qtdMinViagens: 8,
  //       qtdMaxViagens: 14,
  //     },
  //     dataCadastro: "2025-06-24T12:48:06.230Z",
  //     usuariosId: "005e3fc4-e584-4adb-ba69-f3c80c511853",
  //     beneficios: [
  //       "Desconto em viagens",
  //       "Acesso a promoções exclusivas",
  //       "Prioridade em reservas",
  //       "Brinde especial",
  //       "Upgrade de categoria",
  //       "Atendimento personalizado",
  //     ],
  //     urlImagem: "../../../../assets/images/fidelidade-black.png",
  //   },
  //   {
  //     id: "79926cf7-3ea9-463c-8718-b39badce54e7",
  //     nome: "TITANIUM",
  //     qtdViagens: {
  //       qtdMinViagens: 15,
  //       qtdMaxViagens: 30,
  //     },
  //     dataCadastro: "2025-06-24T12:48:35.036Z",
  //     usuariosId: "005e3fc4-e584-4adb-ba69-f3c80c511853",
  //     beneficios: [
  //       "Desconto em viagens",
  //       "Acesso a promoções exclusivas",
  //       "Prioridade em reservas",
  //       "Brinde especial",
  //       "Upgrade de categoria",
  //       "Atendimento personalizado",
  //       "Viagens grátis",
  //     ],
  //     urlImagem: "../../../../assets/images/fidelidade-titanium.png",
  //   },
  // ];

  get beneficios() {
    return this._rankings.benefitsList;
  }

  constructor(private readonly _rankings: RankingsUsecase) {
    this._rankings.getRankings().then((data) => {
      console.log(data);
    });
  }
}
