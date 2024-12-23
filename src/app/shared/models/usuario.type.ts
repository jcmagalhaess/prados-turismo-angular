export type Usuario = {
  id: string;
  nome: string;
  username: string;
  password: string;
  salt: string;
  dataCadastro: string;
  usuarioCadastro: string;
  tipo: number;
  email: string;
  ativo: boolean;
  comissao: any;
  meta: any;
};
