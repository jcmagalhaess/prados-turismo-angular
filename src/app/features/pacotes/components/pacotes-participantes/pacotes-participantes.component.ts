import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import {
  AbstractControl,
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
import { SeletorQuartoComponent } from "../../../../shared/components/seletor-quarto/seletor-quarto.component";
import { yearList } from "../../../../shared/helpers/year-list.helper";
import { ExcursaoLocalEmbarque } from "../../../../shared/models/excursao.type";
import { Months } from "../../../../shared/models/global.type";

@Component({
  selector: "app-pacotes-participantes",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    CurrencyPipe,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    NgxMaskDirective,
    SeletorQuartoComponent,
  ],
  standalone: true,
  templateUrl: "./pacotes-participantes.component.html",
  styleUrl: "./pacotes-participantes.component.scss"
})
export class PacotesParticipantesComponent implements OnChanges, OnInit {
  public months = Months;
  public years = yearList(1900);
  public form = new FormGroup<any>({
    participantes: new FormArray<any>([]),
    tipoQuarto: new FormControl(""),
  });

  get participantes() {
    return this.form.get("participantes") as FormArray;
  }

  get amountOpcionais() {
    return this.opcionais.reduce(
      (acc: number, item: any) => acc + item.value,
      0
    );
  }

  get allOpcionaisAssigned() {
    if (this.opcionais.length === 0) {
      return true; // If there are no opcionais, validation passes
    }

    const participantesArray = this.form.get('participantes') as FormArray;

    // Check each opcional to see if all purchased units are assigned
    return this.opcionais.every((opcional: any) => {
      const selectedCount = participantesArray.controls.reduce((count, participant) => {
        const opcionaisGroup = (participant as FormGroup).get('opcionais') as FormGroup;
        if (!opcionaisGroup) return count;
        const control = opcionaisGroup.get(opcional.key);
        return count + (control?.value ? 1 : 0);
      }, 0);

      // The selected count must equal the purchased amount
      return selectedCount === opcional.value;
    });
  }

  @Input() amountTickets: number = 0;
  @Input() opcionais: any = [];
  @Input() valor: number = 0;
  @Input() localEmbarque: ExcursaoLocalEmbarque[] = [];

  constructor(private readonly _dialog: MatDialogRef<any>) { }

  public ngOnChanges() {
    if (this.amountTickets) {
      for (let index = 0; index < this.amountTickets; index++) {
        this.participantes.push(this._createForm());
      }
    }

    this.opcionais.forEach((element: any) => {
      this.participantes.controls.forEach((item: any) => {
        (item.get("opcionais") as FormGroup).addControl(
          element.key,
          new FormControl(false)
        );
      });
    });
  }

  public ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });

    const participantesArray = this.form.get('participantes') as FormArray;

    participantesArray.controls.forEach((participant: AbstractControl) => {
      const participantGroup = participant as FormGroup;
      const opcionaisGroup = participantGroup.get('opcionais') as FormGroup;
      if (!opcionaisGroup) return;

      Object.keys(opcionaisGroup.controls).forEach(key => {
        const control = opcionaisGroup.get(key);
        if (!control) return;

        control.valueChanges.subscribe(() => {
          this.updateOptionalControls(key);
        });
      });
    });
  }

  public createReservation() {
    this._dialog.close(this.form.getRawValue());
  }

  private _createForm() {
    return new FormGroup<any>({
      nome: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      rg: new FormControl("", [Validators.required, Validators.maxLength(14)]),
      cpf: new FormControl("", Validators.required),
      emissor: new FormControl("", Validators.required),
      dataNascimento: new FormGroup<any>({
        dia: new FormControl("", Validators.required),
        mes: new FormControl("", Validators.required),
        ano: new FormControl("", Validators.required),
      }),
      localEmbarque: new FormControl("", Validators.required),
      opcionais: new FormGroup<any>({}),
    });
  }

  private updateOptionalControls(key: string) {
    const participantesArray = this.form.get('participantes') as FormArray;
    const maxAmount = this.opcionais.find((o: { key: string; }) => o.key === key)?.value || 1;

    const selectedCount = participantesArray.controls.reduce((count, g) => {
      const opcGroup = (g as FormGroup).get('opcionais') as FormGroup;
      if (!opcGroup) return count; 
      const c = opcGroup.get(key);
      return count + (c?.value ? 1 : 0);
    }, 0);

    participantesArray.controls.forEach(g => {
      const opcGroup = (g as FormGroup).get('opcionais') as FormGroup;
      if (!opcGroup) return; 
      const c = opcGroup.get(key);
      if (!c) return;

      if (!c.value && selectedCount >= maxAmount) {
        c.disable({ emitEvent: false });
      } else {
        c.enable({ emitEvent: false });
      }
    });
  }
}
