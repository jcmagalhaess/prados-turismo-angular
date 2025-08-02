import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective } from "ngx-mask";
import { forkJoin } from "rxjs";
import { ActionButtonComponent } from "../../shared/components/action-button/action-button.component";
import { AcessoChangePasswordUsecase } from "../acesso/services/acesso-change-password.usecase";
import { AcessoClientUpdateUsecase } from "../acesso/services/acesso-client-update.usecase";
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";

@Component({
    selector: "app-perfil",
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        ActionButtonComponent,
    ],
    standalone: true,
    templateUrl: "./perfil.component.html",
    styleUrl: "./perfil.component.scss"
})
export class PerfilComponent {
  public form = new FormGroup<any>({
    nome: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl(""),
    cpf: new FormControl(""),
    telefone: new FormControl(""),
    confirmationPassword: new FormControl(""),
    password: new FormControl(""),
  });

  get loading() {
    return this._clientUpdate.loading;
  }

  constructor(
    private readonly _clientUpdate: AcessoClientUpdateUsecase,
    private readonly _changePassword: AcessoChangePasswordUsecase,
    private readonly _client: AcessoGetDataPessoaUsecase
  ) {
    this.form.patchValue(this._client.clientAuthenticated() ?? {});
  }

  public update(form: any) {
    let password = form.password;
    let confirmationPassword = form.confirmationPassword;

    delete form.password;
    delete form.confirmationPassword;

    forkJoin([
      this._clientUpdate.updateUser(form),
      this._changePassword.changePassword({
        password,
        confirmationPassword,
      }),
    ]).subscribe({
      next: () => {
        this._client.carregarCliente(localStorage.getItem("userClient")!);

        this.form.controls['password'].reset();
        this.form.controls['confirmationPassword'].reset();
      },
      error: (err) => console.error(err),
    });
  }
}
