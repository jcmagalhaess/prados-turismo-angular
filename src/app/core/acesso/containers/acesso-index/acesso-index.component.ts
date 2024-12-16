import { Component } from '@angular/core';
import { AcessoCadastroComponent } from '../../components/acesso-cadastro/acesso-cadastro.component';
import { AcessoLoginComponent } from '../../components/acesso-login/acesso-login.component';
import { AcessoRegisterClientUsecase } from '../../services/acesso-register-client.usecase';

@Component({
  selector: 'app-acesso-index',
  standalone: true,
  imports: [AcessoLoginComponent, AcessoCadastroComponent],
  templateUrl: './acesso-index.component.html',
  styleUrl: './acesso-index.component.scss'
})
export class AcessoIndexComponent {
  get loading() {
    return this._register.loading;
  }
  
  constructor(
    private readonly _register: AcessoRegisterClientUsecase
  ) { }

  public register(email: string) {
    this._register.register(email);
  }
}
