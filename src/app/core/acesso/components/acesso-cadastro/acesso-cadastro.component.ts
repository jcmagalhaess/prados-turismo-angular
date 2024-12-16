import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionButtonComponent } from '../../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-acesso-cadastro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ActionButtonComponent, ],
  templateUrl: './acesso-cadastro.component.html',
  styleUrl: './acesso-cadastro.component.scss'
})
export class AcessoCadastroComponent {
  public control = new FormControl('', Validators.required);

  @Input() loading: boolean = false;
  @Output() email = new EventEmitter<string>();

  public register() {
    this.email.emit(this.control.value!);
  }
}
