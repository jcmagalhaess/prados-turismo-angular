import { NgClass } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { BannerCabecalhoComponent } from "../../../shared/components/banner-cabecalho/banner-cabecalho.component";
import { TermosUsoComAereoComponent } from "../components/termos-uso-com-aereo/termos-uso-com-aereo.component";
import { TermosUsoSemAereoComponent } from "../components/termos-uso-sem-aereo/termos-uso-sem-aereo.component";

@Component({
    selector: "app-termos-uso",
    imports: [
        MatTabsModule,
        TermosUsoSemAereoComponent,
        TermosUsoComAereoComponent,
        BannerCabecalhoComponent,
        NgClass,
    ],
    standalone: true,
    templateUrl: "./termos-uso.component.html",
    styleUrl: "./termos-uso.component.scss"
})
export class TermosUsoComponent {
  public isCheckout = input<boolean>(false);
}
