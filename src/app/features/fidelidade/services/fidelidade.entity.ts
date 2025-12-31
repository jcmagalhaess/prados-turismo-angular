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
    beneficios: [
      "Acesso ao grupo VIP da Prados no WhatsApp",
      "Imã colecionável do destino de cada viagem"
    ],
  },
  {
    nome: "SILVER",
    beneficios: [
      "Passaporte da Prados",
      "Adesivo colecionável do destino de cada viagem",
      "Imã colecionável do destino de cada viagem"
    ],
  },
  {
    nome: "GOLD",
    beneficios: [
      "Kit Planeje o Próximo Destino (caneta + cofrinho especial)",
      "Chaveiro exclusivo",
      "Imã e adesivo colecionável do destino de cada viagem"
    ],
  },
  {
    nome: "PLATINUM",
    beneficios: [
      "Kit Viagem Conforto (tapa olho + almofada de pescoço exclusiva + tag para mala)",
      "Imã e adesivo colecionável do destino de cada viagem"
    ],
  },
  {
    nome: "BLACK",
    beneficios: [
      "Kit Essencial de Viagem (necessaire exclusiva com itens essenciais para a viagem)",
      "Imã e adesivo colecionável do destino de cada viagem"
    ],
  },
  {
    nome: "TITANIUM",
    beneficios: [
      "Acesso ao grupo exclusivo Titanium no WhatsApp",
      "Camisa oficial da Prados",
      "Viagem GRÁTIS em pacotes aleatórios com poucos dias de antecedência, sujeito a disponibilidade e divulgada no grupo Titanium no WhatsApp",
      "Imã e adesivo colecionável do destino de cada viagem"
    ],
  },
];
