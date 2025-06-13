import { Component, input } from "@angular/core";
import { MatIconButton } from "@angular/material/button";

@Component({
  selector: "app-depoimentos",
  standalone: true,
  imports: [MatIconButton],
  templateUrl: "./depoimentos.component.html",
  styleUrl: "./depoimentos.component.scss",
})
export class DepoimentosComponent {
  public depoimentos = input<any>([
    {
      avatar: "./assets/images/avatar.png",
      user: "Júlio Magalhães",
      hate: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    },
    {
      avatar: "./assets/images/avatar.png",
      user: "Júlio Magalhães",
      hate: 4,
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    },
    {
      avatar: "./assets/images/avatar.png",
      user: "Júlio Magalhães",
      hate: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    },
  ]);
}
