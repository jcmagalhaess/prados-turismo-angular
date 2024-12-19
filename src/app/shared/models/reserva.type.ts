export type Reserva = {
  localEmbarque?: string;
  excursaoId: string;
  payment_method: string;
  total: number;
  criacas: number;
  clients?: {
    nome: string;
    cpf: string;
    sexo: string;
    observacoes: string | null;
    telefone: string | null;
    telefoneWpp: string | null;
    email: string;
    contato: string | null;
    telefoneContato: string | null;
    dataNascimento: Date | null;
    usuarioCadastro: string;
    rg: string | null;
    emissor: string | null;
    rankingClientesId?: string | null;
  }[];
};
