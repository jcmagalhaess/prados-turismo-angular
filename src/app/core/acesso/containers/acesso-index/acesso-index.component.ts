import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatDialog, MatDialogClose } from "@angular/material/dialog";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { ToasterService } from "../../../../shared/components/toaster/toaster.service";
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
    styleUrl: "./acesso-index.component.scss"
})
export class AcessoIndexComponent {
  public formRegister = new FormGroup({
    email: new FormControl("", Validators.required),
    cpf: new FormControl("", Validators.required),
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

  public register(email: string) {
    this._register
      .register(email)
      .then((_) => {
        this.formRegister.reset();
        this._dialog.closeAll();

        this._toaster.success(
          "Cadastro realizado com sucesso! Confira seu e-mail com os proximos passos!"
        );
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
