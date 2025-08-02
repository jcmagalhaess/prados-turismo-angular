import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-meu-carrinho-cupom',
    imports: [ReactiveFormsModule],
    standalone: true,
    templateUrl: './meu-carrinho-cupom.component.html',
    styleUrl: './meu-carrinho-cupom.component.scss'
})
export class MeuCarrinhoCupomComponent {
  private _resetCupom = signal<boolean>(false);
  public cupomControl = new FormControl();
  public hasCupom = input<boolean>(this._resetCupom());
  public loading = input<boolean>(false);

  @Output() cupomEmit = new EventEmitter();

  public validateCupom() {
    this.cupomEmit.emit(this.cupomControl.value);
  }

  public removeCupom() {
    this._resetCupom.set(false);
  }
}
