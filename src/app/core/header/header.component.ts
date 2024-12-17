import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AcessoClientAuthenticatedUsecase } from '../acesso/services/acesso-client-authenticated.usecase';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menu = [
    { label: 'Home', route: '' },
    { label: 'Pacotes', route: '/pacotes' },
  ];

  get client() {
    return this._user.clientAuthenticated;
  }

  constructor(
    private readonly _router: Router,
    private readonly _user: AcessoClientAuthenticatedUsecase
  ) {
    effect(() => {
      console.log(this.client());
      
    })
  }

  public navigate(route: string) {
    this._router.navigate([route]);
  }
}
