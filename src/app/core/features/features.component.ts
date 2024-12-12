import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  public features = [
    { label: 'Parcele em até 12x', icon: 'fa-solid fa-credit-card' },
    { label: 'Suporte 24 horas', icon: 'fa-solid fa-headset' },
    { label: 'Conexão Segura', icon: 'fa-solid fa-fingerprint' },
    { label: 'Programa de Pontos e Fidelidade', icon: 'fa-solid fa-money-check-dollar' },
  ]
}
