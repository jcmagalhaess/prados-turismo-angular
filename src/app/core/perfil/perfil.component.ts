import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AcessoClientAuthenticatedUsecase } from "../acesso/services/acesso-client-authenticated.usecase";
import { AcessoClientUpdateUsecase } from "../acesso/services/acesso-client-update.usecase";

@Component({
  selector: "app-perfil",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./perfil.component.html",
  styleUrl: "./perfil.component.scss",
})
export class PerfilComponent {
  public form = new FormGroup<any>({
    name: new FormControl(""),
    lastname: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl(""),
    currentPassword: new FormControl(""),
    newPassword: new FormControl(""),
    confirmPassword: new FormControl(""),
  });

  constructor(
    private readonly _clientUpdate: AcessoClientUpdateUsecase,
    private readonly _client: AcessoClientAuthenticatedUsecase
  ) {}
  
  public update(form: any) {
    this._clientUpdate.updateUser({
      nome: `${form.name} ${form.lastname}`,
      username: form.username,
      password: form.newPassword,
      email: form.email,
    })
    .then(() => {
      this._client.clientAuthenticated();
    })
    .catch((err) => console.error(err))
  }
}
