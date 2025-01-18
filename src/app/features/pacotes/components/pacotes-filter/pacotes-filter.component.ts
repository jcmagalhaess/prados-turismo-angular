import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pacotes-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './pacotes-filter.component.html',
  styleUrl: './pacotes-filter.component.scss',
})
export class PacotesFilterComponent {
  public origem = signal<number>(1);

  @Output() origemEmit = new EventEmitter<any>();

  constructor() {
    effect(() => this.origemEmit.emit({ origem: this.origem() }))
  }

  public origemChoose(value: number) {
    this.origem.set(value);
  }
}
