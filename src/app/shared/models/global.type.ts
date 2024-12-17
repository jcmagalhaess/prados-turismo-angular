export enum MonthEnum {
  Janeiro,
  Fevereiro,
  Março,
  Abril,
  Maio,
  Junho,
  Julho,
  Agosto,
  Setembro,
  Outubro,
  Novembro,
  Dezembro,
}

export const Months = Object.values(MonthEnum)
  .filter((item) => typeof item !== "number")
  .map((key: any) => (key));

export type EnumType<T> = {
  key: string;
  value: T
}