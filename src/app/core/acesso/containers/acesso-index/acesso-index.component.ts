import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatDialog, MatDialogClose } from "@angular/material/dialog";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { ToasterService } from "../../../../shared/components/toaster/toaster.service";
import { cpfCnpjValidator } from "../../../../shared/validators/cpfCnpj.validator";
import { AcessoCadastroComponent } from "../../components/acesso-cadastro/acesso-cadastro.component";
import { AcessoLoginComponent } from "../../components/acesso-login/acesso-login.component";
import { AcessoLoginClientUsecase } from "../../services/acesso-login-client.usecase";
import { AcessoRegisterClientUsecase } from "../../services/acesso-register-client.usecase";

@Component({
  selector: "app-acesso-index",
  imports: [
    AcessoLoginComponent,
    AcessoCadastroComponent,
    MatTabGroup,
    MatTab,
    MatIconButton,
    MatDialogClose,
  ],
  standalone: true,
  templateUrl: "./acesso-index.component.html",
  styleUrl: "./acesso-index.component.scss",
})
export class AcessoIndexComponent {
  public formRegister = new FormGroup({
    email: new FormControl("", Validators.required),
    cpf: new FormControl("", [Validators.required, cpfCnpjValidator]),
    nome: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  get loadingRegister() {
    return this._register.loading;
  }

  get loadingLogin() {
    return this._login.loading;
  }

  constructor(
    private readonly _register: AcessoRegisterClientUsecase,
    private readonly _login: AcessoLoginClientUsecase,
    private readonly _router: Router,
    private readonly _toaster: ToasterService,
    private readonly _dialog: MatDialog
  ) {}

  public register(formData: any) {
    this._register
      .register(formData)
      .then((_) => {
        this._toaster.success(
          "Cadastro realizado com sucesso! Login efetuado!"
        );

        // Automatically log in with the registered credentials
        const loginData = {
          username: formData.email,
          password: formData.password
        };

        return this._login.login(loginData);
      })
      .then(() => {
        this.formRegister.reset();
        this._dialog.closeAll();

        let cart = JSON.parse(localStorage.getItem("cart")!);

        if (cart && cart.length) {
          this._router.navigate(["meu-carrinho"]);
        } else {
          this._router.navigate(["minha-conta"]);
        }
      })
      .catch((err) => this._toaster.error(err.error.message));
  }

  public login(login: any) {
    this._login
      .login(login)
      .then(() => {
        let cart = JSON.parse(localStorage.getItem("cart")!);
        this._dialog.closeAll();

        if (cart.length) this._router.navigate(["meu-carrinho"]);
        else this._router.navigate(["minha-conta"]);
      })
      .catch((err) => this._toaster.error(err.error.message));
  }
}
