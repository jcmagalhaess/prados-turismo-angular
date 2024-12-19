import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ActionButtonComponent } from '../../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-acesso-cadastro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ActionButtonComponent, NgxMaskDirective],
  templateUrl: './acesso-cadastro.component.html',
  styleUrl: './acesso-cadastro.component.scss'
})
export class AcessoCadastroComponent {
  public form = new FormGroup({
    email: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })

  @Input() loading: boolean = false;
  @Output() email = new EventEmitter<any>();

  public register() {
    this.email.emit(this.form.value!);
  }
}
