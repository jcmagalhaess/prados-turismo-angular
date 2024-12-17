import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcessoClientAuthenticatedUsecase } from './core/acesso/services/acesso-client-authenticated.usecase';
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
  title = 'prados-turismo-angular';

  constructor(
    private readonly _auth: AuthMasterService,
    private readonly _clientAuth: AcessoClientAuthenticatedUsecase
  ) {
    this._auth.authenticationMaster();

    if (localStorage.getItem("clientToken")) this._clientAuth.login();
  }
}
