import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pacotes-count',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, MatInputModule],
  templateUrl: './pacotes-count.component.html',
  styleUrl: './pacotes-count.component.scss'
})
export class PacotesCountComponent {
  public control = new FormControl(0, [Validators.min(0)]);

  @Input() key: string = '';
  @Input() type: string = '';
  @Input() age: string = '';
  @Input() valor: number = 0;

  @Output() amountEmit = new EventEmitter<any>()
  
  public formatValue(value: number) {
    if (this.key === 'babies') return 0;

    return value;
  }

  public increment() {
    this.control.setValue(this.control.value! + 1);

    this._amountHandle();
  }

  public decrement() {
    this.control.setValue(this.control.value! - 1);

    this._amountHandle();
  }

  private _amountHandle() {
    this.amountEmit.emit({
      key: this.key,
      value: this.control.value!
    })
  }
}
