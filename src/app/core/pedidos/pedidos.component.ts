import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
  public orderNumber(index: number) {
    let order = (index + 1).toString();
    
    return `#${order.padStart(4, '0')}`;
  }
}
