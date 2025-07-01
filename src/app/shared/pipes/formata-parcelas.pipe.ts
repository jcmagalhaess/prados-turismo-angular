import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formataParcelas",
  standalone: true,
})
export class FormataParcelasPipe implements PipeTransform {
  transform(value: string): string {
    console.log(value);

    if (value.toLowerCase().includes("terrestre")) return "em até 5x sem juros";
    return "em até 10x sem juros";
  }
}
