import { CurrencyPipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective } from "ngx-mask";

@Component({
  selector: "app-pacotes-count",
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  standalone: true,
  templateUrl: "./pacotes-count.component.html",
  styleUrl: "./pacotes-count.component.scss",
})
export class PacotesCountComponent {
  public control = new FormControl<number>(0, [Validators.min(0)]);

  @Input() key: string = "";
  @Input() type: string = "";
  @Input() age: string = "";
  @Input() valor: number = 0;
  @Input() nocount: boolean = false;
  @Input() max: number | null = null;

  @Output() amountEmit = new EventEmitter<any>();

  constructor() {
    this.control.valueChanges.subscribe((value) => {
      console.log(value);

      this._amountHandle(value!);
    });
  }

  public formatValue(value: number) {
    if (this.key === "babies") return 0;

    return value;
  }

  public increment() {
    const currentValue =
      typeof this.control.value === "string"
        ? parseInt(this.control.value)
        : this.control.value!;
    this.control.setValue(currentValue + 1);
  }

  public decrement() {
    this.control.setValue(this.control.value! - 1);
  }

  private _amountHandle(value: number) {
    this.amountEmit.emit({
      key: this.key,
      value: value!,
      name: this.type,
    });
  }
}
