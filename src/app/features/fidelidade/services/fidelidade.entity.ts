export type QtdViagens = {
  qtdMinViagens: number;
  qtdMaxViagens: number;
};

export type BenefitsList = {
  id: string;
  nome: string;
  qtdViagens: QtdViagens;
  dataCadastro: string;
  usuariosId: string;
  beneficios: string[];
  urlImagem: string;
};
