import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PedidosDetailsComponent } from '../../containers/pedidos-details/pedidos-details.component';

@Component({
    selector: 'app-pedidos-modal',
    imports: [CommonModule, MatDialogModule, MatButtonModule, PedidosDetailsComponent],
    standalone: true,
    templateUrl: './pedidos-modal.component.html',
    styleUrl: './pedidos-modal.component.scss'
})
export class PedidosModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
