import { Component } from '@angular/core';
import { BannerCabecalhoComponent } from '../../shared/components/banner-cabecalho/banner-cabecalho.component';

@Component({
    selector: 'app-sobre-nos',
    imports: [BannerCabecalhoComponent],
    standalone: true,
    templateUrl: './sobre-nos.component.html',
    styleUrl: './sobre-nos.component.scss'
})
export class SobreNosComponent {

}
