import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pacotes-filter',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  standalone: true,
  templateUrl: './pacotes-filter.component.html',
  styleUrl: './pacotes-filter.component.scss'
})
export class PacotesFilterComponent {
  public origem = signal<number>(1);

  @Output() origemEmit = new EventEmitter<any>();

  constructor() {
    effect(() => this.origemEmit.emit({
      origem: this.origem(), 
      publicado: true,
      orderBy: "dataInicio",
      concluida: false,
      dataInicio: new Date().toISOString().split('T')[0]
    }))
  }

  public origemChoose(value: number) {
    this.origem.set(value);
  }
}
