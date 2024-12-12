import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [
    CommonModule
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
