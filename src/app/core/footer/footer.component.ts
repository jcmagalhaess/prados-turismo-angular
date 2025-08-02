import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { env } from '../../../env/env';


@Component({
    selector: 'app-footer',
    imports: [CommonModule, MatButtonModule, MatTooltipModule, RouterModule],
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public whatsappLink = env.WHATSAPP_LINK;
}
