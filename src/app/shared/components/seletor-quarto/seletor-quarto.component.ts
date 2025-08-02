import { HttpClient } from "@angular/common/http";
import { Component, forwardRef, input, OnInit, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";

@Component({
    selector: "app-seletor-quarto",
    imports: [],
    standalone: true,
    templateUrl: "./seletor-quarto.component.html",
    styleUrl: "./seletor-quarto.component.scss",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SeletorQuartoComponent),
            multi: true,
        },
    ]
})
export class SeletorQuartoComponent implements ControlValueAccessor, OnInit {
  public quartos = signal<any>([]);
  public label = input<string>("Selecione o quarto");
  protected _value: any = "";

  private onChange: any = () => {};
  private onTouched: any = () => {};

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
  }

  constructor(private readonly _http: HttpClient) {}

  public ngOnInit(): void {
    this.getQuartos().then((quartos) => {
      this.quartos.set(quartos);
    });
  }

  public getQuartos() {
    return lastValueFrom(
      this._http.get<any[]>(`${env.API}/tipo-quarto/findAll`)
    );
  }

  public onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;
    this.value = selectedValue; // Isso chama o setter e propaga a mudança
  }
  writeValue(obj: any): void {
    if (obj !== this._value) {
      this._value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
