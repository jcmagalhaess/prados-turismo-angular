import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaskDirective } from "ngx-mask";
import { ActionButtonComponent } from "../../../../shared/components/action-button/action-button.component";

@Component({
  selector: "app-acesso-cadastro",
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ActionButtonComponent,
    NgxMaskDirective,
  ],
  standalone: true,
  templateUrl: "./acesso-cadastro.component.html",
  styleUrl: "./acesso-cadastro.component.scss",
})
export class AcessoCadastroComponent {
  @Input() loading: boolean = false;
  @Input() form = new FormGroup<any>({});

  @Output() email = new EventEmitter<any>();

  public register() {
    this.email.emit(this.form.value!);
  }
}
