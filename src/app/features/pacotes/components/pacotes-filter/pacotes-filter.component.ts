import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExcursoesDestinosUsecase } from '../../services/excursoes-destinos.usecase';

@Component({
  selector: 'app-pacotes-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacotes-filter.component.html',
  styleUrl: './pacotes-filter.component.scss',
})
export class PacotesFilterComponent implements OnInit {
  public form = new FormGroup<any>({
    origem: new FormControl(null, Validators.required),
    pacoteId: new FormControl(null, Validators.required),
  });

  @Output() formEmit = new EventEmitter<any>();

  get destinos() {
    return this._destinos.destinos;
  }

  constructor(
    private readonly _destinos: ExcursoesDestinosUsecase
  ) { }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.formEmit.emit(value);
    })

    this._destinos.getDestinos().then(res=> console.log(res));
  }

  public disabledResetBtn() {
    return !this.form.dirty;
  }
}
