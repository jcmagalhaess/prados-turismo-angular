import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcessoClientAuthenticatedUsecase } from '../acesso/services/acesso-client-authenticated.usecase';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.scss'
})
export class PainelComponent {
  get client() {
    return this._client.clientAuthenticated();
  }
  
  constructor(
    private readonly _client: AcessoClientAuthenticatedUsecase
  ) {
    effect(() => {
      console.log(this._client.clientAuthenticated());
      
    })
  }
}
