import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToasterService } from "../../../../shared/components/toaster/toaster.service";
import { AcessoCadastroComponent } from "../../components/acesso-cadastro/acesso-cadastro.component";
import { AcessoLoginComponent } from "../../components/acesso-login/acesso-login.component";
import { AcessoLoginClientUsecase } from "../../services/acesso-login-client.usecase";
import { AcessoRegisterClientUsecase } from "../../services/acesso-register-client.usecase";

@Component({
  selector: "app-acesso-index",
  standalone: true,
  imports: [AcessoLoginComponent, AcessoCadastroComponent],
  templateUrl: "./acesso-index.component.html",
  styleUrl: "./acesso-index.component.scss",
})
export class AcessoIndexComponent {
  public formRegister = new FormGroup({
    email: new FormControl("", Validators.required),
    cpf: new FormControl("", Validators.required),
    nome: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
  });

  get loadingRegister() {
    return this._register.loading;
  }

  get loadingLogin() {
    return this._register.loading;
  }

  constructor(
    private readonly _register: AcessoRegisterClientUsecase,
    private readonly _login: AcessoLoginClientUsecase,
    private readonly _router: Router,
    private readonly _toaster: ToasterService
  ) {}

  public register(email: string) {
    this._register
      .register(email)
      .then((_) => {
        this.formRegister.reset();

        this._toaster.success("Cadastro realizado com sucesso! Confira seu e-mail com os proximos passos!");
      })
      .catch((err) => this._toaster.error(err.error.message));
  }

  public login(login: any) {
    this._login
      .login(login)
      .then(() => this._router.navigate(["minha-conta"]))
      .catch((err) => this._toaster.error(err.error.message));
  }
}
