import { EnumType } from "./global.type";

export type Excursao = {
  id: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
  duracao: string;
  observacoes: string;
  dataCadastro: string;
  ativo: boolean;
  gerouFinanceiro: false;
  vagas: number;
  codigoPacote: string;
  usuarioCadastro: string;
  valor: number;
  qtdMinVendas: number;
  ExcursaoPassageiros: [];
  Pacotes: ExcursaoPacote;
  LocalEmbarque: ExcursaoLocalEmbarque[];
};

export type ExcursaoPacote = {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  dataCadastro: string;
  origem: any;
  tipoTransporte: number;
  urlImagem: string;
  urlImgEsgotado: string;
  usuarioCadastro: string;
  Produto: ExcursaoProduto[];
  Galeria: ExcursaoImagem[];
  Imagem: ExcursaoImagem;
  ImagemBloqueado: ExcursaoImagem;
};

export type ExcursaoProduto = {
  id: string;
  nome: string;
  estoque: number;
  dataCompra: null;
  dataCadastro: string;
  ativo: boolean;
  valor: number;
  codigoFornecedor: string;
  usuarioCadastro: string;
};

export type ExcursaoImagem = {
  id: string;
  nome: string;
  url: string;
  dataUpload: string;
  userId: string;
  pacotesId: string;
};

export type ExcursaoLocalEmbarque = {
  id: string;
  nome: string;
  observacoes: string;
  horaEmbarque: string;
  dataCadastro: string;
  ativo: boolean;
  codigoEndereco: string;
  usuarioCadastro: string;
};

export const Origem: EnumType<string>[] = [
  { key: '1', value: 'Fortaleza' },
  { key: '2', value: 'Tianguá' }
]

export enum TipoPassageiroEnum {
  adults = 'Adulto',
  children = 'Criança',
  babies = 'Crianças de colo'
}

export type TipoPassageiroType = keyof typeof TipoPassageiroEnum;