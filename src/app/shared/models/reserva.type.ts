import { Excursao, ExcursaoLocalEmbarque, ExcursaoProduto } from "./excursao.type";

export type ReservaInput = {
  localEmbarque?: string;
  excursaoId: string;
  payment_method: string;
  total: number;
  criancas: number;
  clients?: ReservaClientInput[];
};

export type ReservaClientInput = {
  nome: string;
  cpf: string;
  sexo?: string;
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
}

export type ReservaOutput = {
  id: string;
  reserva: number;
  dataCadastro: string;
  status: boolean;
  desconto: number;
  plataforma: number;
  criancasColo: number;
  excluida: boolean;
  codigoUsuario: string;
  idExcursao: string;
  localEmbarqueId: string;
  Excursao: Excursao;
  Opcionais: OpcionaisOutput[];
  Transacoes: TransacoesOutput[];
  LocalEmbarque: ExcursaoLocalEmbarque;
  CreditoClientes: any[];
  valorTotal: number;
};

export type OpcionaisOutput = {
  id: string;
  qtd: number;
  dataCadastro: string;
  idReserva: string;
  idProduto: string;
  codigoUsuario: string;
  Produto: ExcursaoProduto;
};

export type TransacoesOutput = {
  id: string;
  tipo: number;
  valor: number;
  vistoAdmin: boolean;
  data: string;
  efetivado: boolean;
  observacao: string;
  ativo: boolean;
  numeroComprovanteBancario: string;
  idWP: string;
  codigoPessoa: string;
  codigoFornecedor: string;
  codigoExcursao: string;
  codigoProduto: string;
  codigoPacote: string;
  codigoFormaPagamento: string;
  codigoCategoria: string;
  codigoContaBancaria: string;
  usuarioCadastro: string;
  idReserva: string;
};
