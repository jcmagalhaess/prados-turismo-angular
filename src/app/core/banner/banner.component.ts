import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
} from "@coreui/angular";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CarouselControlComponent,
    RouterLink,
  ],
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss"
})
export class BannerComponent implements OnInit {

  slides: any[] = [
    { src: 'assets/images/fortaleza.webp', alt: 'Fortaleza' },
    { src: 'assets/images/tiangua.webp', alt: 'Tianguá' },
  ]

  ngOnInit(): void { }
}
