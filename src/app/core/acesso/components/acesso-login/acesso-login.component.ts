import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ActionButtonComponent } from "../../../../shared/components/action-button/action-button.component";

@Component({
  selector: "app-acesso-login",
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, ActionButtonComponent],
  templateUrl: "./acesso-login.component.html",
  styleUrl: "./acesso-login.component.scss",
})
export class AcessoLoginComponent {
  public form = new FormGroup<any>({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  @Input() loading: boolean = false;
  @Output() login = new EventEmitter<string>();

  public acesso() {
    this.login.emit(this.form.value!);
  }
}
