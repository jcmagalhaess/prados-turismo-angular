import { ReservaOutput } from "./reserva.type";

export type Cliente = {
  id: string;
  nome: string;
  cpf: string;
  sexo: string;
  dataCadastro: string;
  observacoes: string;
  telefone: string;
  telefoneWpp: string;
  email: string;
  contato: string;
  telefoneContato: string;
  ativo: true;
  dataNascimento: string;
  rg: string;
  emissor: string;
  usuarioCadastro: string;
  rankingClientesId: string;
  userId: string;
  Ranking: number;
  Reservas: ReservaOutput[];
};
