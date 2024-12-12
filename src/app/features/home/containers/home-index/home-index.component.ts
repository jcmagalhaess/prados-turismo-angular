import { Component } from '@angular/core';
import { BannerComponent } from '../../../../core/banner/banner.component';
import { FeaturesComponent } from '../../../../core/features/features.component';
import { ExcursaoCardComponent } from '../../../../shared/components/excursao-card/excursao-card.component';

@Component({
  selector: 'app-home-index',
  standalone: true,
  imports: [BannerComponent, FeaturesComponent, ExcursaoCardComponent],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.scss'
})
export class HomeIndexComponent {

}
