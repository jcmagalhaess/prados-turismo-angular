import { UpperCasePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { QtdViagens } from "../../services/fidelidade.entity";

@Component({
    selector: "app-fidelidade-beneficio",
    imports: [UpperCasePipe],
    standalone: true,
    templateUrl: "./fidelidade-beneficio.component.html",
    styleUrl: "./fidelidade-beneficio.component.scss"
})
export class FidelidadeBeneficioComponent {
  public urlImagem = input<string>();
  public urlAlt = input<string>();
  public nome = input<string>();
  public qtdViagens = input<QtdViagens>();
  public beneficio = input<string[]>();

  public formatedTravel(viagens: QtdViagens): string {
    const { qtdMinViagens, qtdMaxViagens } = viagens;

    if (qtdMinViagens === qtdMaxViagens && qtdMaxViagens === 1) {
      return `${qtdMinViagens} viagem`;
    }

    if (qtdMinViagens === qtdMaxViagens) {
      return `${qtdMinViagens} viagens`;
    }

    return `${qtdMinViagens} a ${qtdMaxViagens} viagens`;
  }

  public formatedBenefits(benefits: string[]): string {
    return benefits.join("\n");
  }
}
