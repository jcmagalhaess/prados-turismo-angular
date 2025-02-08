import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective } from "ngx-mask";
import { yearList } from "../../../../shared/helpers/year-list.helper";
import { ExcursaoLocalEmbarque } from "../../../../shared/models/excursao.type";
import { Months } from "../../../../shared/models/global.type";

@Component({
  selector: "app-pacotes-participantes",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    CurrencyPipe,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    NgxMaskDirective
  ],
  templateUrl: "./pacotes-participantes.component.html",
  styleUrl: "./pacotes-participantes.component.scss",
})
export class PacotesParticipantesComponent implements OnChanges {
  public months = Months;
  public years = yearList(1900);
  public form = new FormGroup<any>({
    participantes: new FormArray<any>([]),
  });

  get participantes() {
    return this.form.get("participantes") as FormArray;
  }
  
  get amountOpcionais() {
    return this.opcionais.reduce((acc: number, item: any) => acc + item.value, 0);
  }

  @Input() amountTickets: number = 0;
  @Input() opcionais: any = [];
  @Input() valor: number = 0;
  @Input() localEmbarque: ExcursaoLocalEmbarque[] = [];

  constructor(private readonly _dialog: MatDialogRef<any>) {}

  public ngOnChanges() {
    if (this.amountTickets) {
      for (let index = 0; index < this.amountTickets; index++) {
        this.participantes.push(this._createForm());
      }
    }

    this.opcionais.forEach((element: any) => {
      this.participantes.controls.forEach((item: any) => {
        (item.get('opcionais') as FormGroup).addControl(element.key, new FormControl(false));
      });
    });
  }

  public createReservation() {        
    this._dialog.close(this.participantes.getRawValue());
  }

  private _createForm() {
    return new FormGroup<any>({
      nome: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      rg: new FormControl("", [Validators.maxLength(14)]),
      cpf: new FormControl(""),
      emissor: new FormControl(""),
      dataNascimento: new FormGroup<any>({
        dia: new FormControl(""),
        mes: new FormControl(""),
        ano: new FormControl(""),
      }),
      localEmbarque: new FormControl(""),
      opcionais: new FormGroup<any>({}),
    });
  }
}
