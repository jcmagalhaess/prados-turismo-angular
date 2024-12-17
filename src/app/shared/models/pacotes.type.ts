import { Excursao, ExcursaoPacote } from "./excursao.type";

export type Pacotes = ExcursaoPacote &{
  Excursao: Excursao[];
};
