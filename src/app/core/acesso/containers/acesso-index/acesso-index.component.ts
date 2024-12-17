import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcessoCadastroComponent } from '../../components/acesso-cadastro/acesso-cadastro.component';
import { AcessoLoginComponent } from '../../components/acesso-login/acesso-login.component';
import { AcessoLoginClientUsecase } from '../../services/acesso-login-client.usecase';
import { AcessoRegisterClientUsecase } from '../../services/acesso-register-client.usecase';

@Component({
  selector: 'app-acesso-index',
  standalone: true,
  imports: [AcessoLoginComponent, AcessoCadastroComponent],
  templateUrl: './acesso-index.component.html',
  styleUrl: './acesso-index.component.scss'
})
export class AcessoIndexComponent {
  get loadingRegister() {
    return this._register.loading;
  }

  get loadingLogin() {
    return this._register.loading;
  }
  
  constructor(
    private readonly _register: AcessoRegisterClientUsecase,
    private readonly _login: AcessoLoginClientUsecase,
    private readonly _router: Router
  ) { }

  public register(email: string) {
    this._register.register(email);
  }

  public login(login: any) {
    this._login
      .login(login)
      .then(() => this._router.navigate(['minha-conta']));
  }
}
