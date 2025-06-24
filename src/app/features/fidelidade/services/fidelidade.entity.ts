export type QtdViagens = {
  qtdMinViagens: number;
  qtdMaxViagens: number;
};

export type RankingsList = {
  id: string;
  nome: string;
  qtdViagens: QtdViagens;
  dataCadastro: string;
  usuariosId: string;
  beneficios: string[];
  urlImagem: string;
};

export const benefitsList = [
  {
    nome: "CLASSIC",
    beneficios: ["INGRESSO PARA GRUPO VIP"],
  },
  {
    nome: "SILVER",
    beneficios: ["MINI KIT VIAGEM DA PRADOS"],
  },
  {
    nome: "GOLD",
    beneficios: ["PASSAPORTE DA PRADOS"],
  },
  {
    nome: "PLATINUM",
    beneficios: [
      "TROFÉU PLATINUM - ESCOLHER A POLTRONA - ALMOFADA DE PESCOÇO DA PRADOS",
    ],
  },
  {
    nome: "BLACK",
    beneficios: ["TROFÉU BLACK - ESCOLHER A POLTRONA - KIT VIAGEM DA PRADOS"],
  },
  {
    nome: "TITANIUM",
    beneficios: [
      "TROFÉU TITANIUM - ESCOLHER A POLTRONA - ALMOFADA DE PESCOÇO DA PRADOS - INGRESSO PARA GRUPO TITANIUM - BLUSA DA PRADOS - VIAGEM GRÁTIS",
    ],
  },
];
