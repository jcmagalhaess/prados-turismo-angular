import { Component, input } from "@angular/core";
import { MatIconButton } from "@angular/material/button";

@Component({
    selector: "app-depoimentos",
    imports: [MatIconButton],
    standalone: true,
    templateUrl: "./depoimentos.component.html",
    styleUrl: "./depoimentos.component.scss"
})
export class DepoimentosComponent {
  public depoimentos = input<any>([
    {
      avatar: "./assets/images/depoimentos/ana-caroline.jpeg",
      user: "Ana Caroline",
      hate: 5,
      comment:
        "Mais uma viagem sensacional com a Prados! Admiro a organização e o cuidado que vocês tem com a gente. Deixo aqui o meu muito obrigada a Gabi, pessoa incrível e muito atenciosa com o grupo. Essa sem dúvidas, foi uma das melhores viagens da minha vida! Que venham as próximas!!😊👏🏻👏🏻 …",
    },
    {
      avatar: "./assets/images/depoimentos/divinha-marrocos.jpeg",
      user: "Divinha Marrocos",
      hate: 5,
      comment:
        "Adoramos o passeio a Foz do Iguaçu foi um dos momentos mais incríveis da vida!!! A aventura de conhecer as Cataratas do Iguaçu com essa vazão gigante de água!!! A Viagem toda foi maravilhosa!! A Prados Turismos foi perfeita pra gente, desde a recepção no aeroporto, a organização da programação dos passeios, todo dedicado aos clientes! Obrigada Emanuel você é Show! Estaremos juntos em várias outros passeios!!!",
    },
    {
      avatar: "./assets/images/depoimentos/rita-marcia.jpeg",
      user: "Rita Marcia Praciano",
      hate: 5,
      comment:
        "Viagem incrível, custo camarada, roteiro bem planejado, hospedagem de primeira e como sempre a Prados atenciosa e cuidadosa com todos . Uma nota ? 1000",
    },
  ]);
}
