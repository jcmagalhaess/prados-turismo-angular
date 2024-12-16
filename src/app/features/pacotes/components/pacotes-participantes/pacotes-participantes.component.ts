import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { ExcursaoLocalEmbarque } from '../../../../shared/models/excursao.type';


@Component({
  selector: 'app-pacotes-participantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, CurrencyPipe, MatExpansionModule],
  templateUrl: './pacotes-participantes.component.html',
  styleUrl: './pacotes-participantes.component.scss'
})
export class PacotesParticipantesComponent implements OnChanges {
  public form = new FormGroup<any>({
    rows: new FormArray<any>([]),
  });

  get rows() {
    return this.form.get('rows') as FormArray;
  }

  @Input() amountTickets: number = 0;
  @Input() valor: number = 0;
  @Input() localEmbarque: ExcursaoLocalEmbarque[] = [];

  public ngOnChanges() {
    if (this.amountTickets) {
      
      for (let index = 0; index < this.amountTickets; index++) {
        console.log('teste');
        this.rows.push(this._createForm());
      }
    }
  }
  
  private _createForm() {
    return new FormGroup<any>({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      rg: new FormControl(''),
      orgaoEmissor: new FormControl(''),
      dia: new FormControl(''),
      localEmbarque: new FormControl(''),
    });
  }
}
