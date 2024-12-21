import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcessoLoginClientUsecase } from '../acesso/services/acesso-login-client.usecase';

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
    private readonly _client: AcessoLoginClientUsecase
  ) {
    effect(() => {
      console.log(this._client.clientAuthenticated());
      
    })
  }
}
