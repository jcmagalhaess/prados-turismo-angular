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
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
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
    MatDialogModule
  ],
  templateUrl: "./pacotes-participantes.component.html",
  styleUrl: "./pacotes-participantes.component.scss",
})
export class PacotesParticipantesComponent implements OnChanges {
  public months = Months;
  public years = yearList(1900);
  public form = new FormGroup<any>({
    rows: new FormArray<any>([]),
  });

  get rows() {
    return this.form.get("rows") as FormArray;
  }

  @Input() amountTickets: number = 0;
  @Input() valor: number = 0;
  @Input() localEmbarque: ExcursaoLocalEmbarque[] = [];

  public ngOnChanges() {
    if (this.amountTickets) {
      for (let index = 0; index < this.amountTickets; index++) {
        console.log("teste");
        this.rows.push(this._createForm());
      }
    }
  }

  public createReservation() {
    console.log({
      ...this.form.getRawValue(),
    });
  }

  private _createForm() {
    return new FormGroup<any>({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      rg: new FormControl("", Validators.required),
      cpf: new FormControl("", Validators.required),
      orgaoEmissor: new FormControl("", Validators.required),
      dataNascimento: new FormGroup<any>({
        dia: new FormControl("", Validators.required),
        mes: new FormControl("", Validators.required),
        ano: new FormControl("", Validators.required),
      }, Validators.required),
      localEmbarque: new FormControl("", Validators.required),
    });
  }
}
