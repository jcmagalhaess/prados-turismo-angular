import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcessoGetDataPessoaUsecase } from './core/acesso/services/acesso-get-data-pessoa.usecase';
import { AcessoLoginClientUsecase } from './core/acesso/services/acesso-login-client.usecase';
import { AuthMasterService } from './core/auth/services/auth-master.service';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Prados Turismo';

  constructor(
    private readonly _auth: AuthMasterService,
    private readonly _clientUser: AcessoGetDataPessoaUsecase,
    private readonly _loginClient: AcessoLoginClientUsecase
  ) {
    this._auth.authenticationMaster();
    effect(() => {
      let userClient = localStorage.getItem("userClient") ?? this._loginClient.userClient();
      if (userClient) this._clientUser.carregarCliente(userClient)
    }, { allowSignalWrites: true })
  }
}
