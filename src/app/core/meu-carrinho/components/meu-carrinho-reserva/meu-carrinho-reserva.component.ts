import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-meu-carrinho-reserva',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './meu-carrinho-reserva.component.html',
  styleUrl: './meu-carrinho-reserva.component.scss'
})
export class MeuCarrinhoReservaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public url: string,
    private readonly _dialogRef: DialogRef
  ) {}
  
  public redirecionar() {
    this._dialogRef.close();
    window.open(this.url, '_blank');
  }
}
