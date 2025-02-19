import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type AjudaType = {
  title: string,
  questions: {
    question: string,
    response: string,
    type?: string
  }[]
}

@Component({
  selector: 'app-ajuda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajuda.component.html',
  styleUrl: './ajuda.component.scss'
})
export class AjudaComponent implements OnInit {
  private _originalList = [
    {
      title: "📌 Sobre Reservas e Pacotes",
      questions: [
        {
          question: "Como faço para reservar um pacote de viagem?",
          response: "Basta acessar nosso site, clicar no pacote de seu interesse e se for possível adicionar a quantidade de pessoas na página do pacote, significa que há vagas disponíveis. Se houver disponibilidade, siga os passos para registrar seus dados e realizar o pagamento. Após a aprovação, você receberá um e-mail com a confirmação, voucher e contrato. O voucher também fica disponível na sua conta registrada no site."
        },
        {
          question: "Posso pagar uma entrada para garantir minha reserva?",
          response: "Não. A reserva só é confirmada após o pagamento total do pacote."
        },
        {
          question: "Como saber se ainda há vagas disponíveis para uma excursão?",
          response: "Se for possível adicionar a quantidade de pessoas na página do pacote, significa que há vagas disponíveis. Caso contrário, o pacote está esgotado. Você também pode confirmar conosco nos canais de atendimento."
        },
        {
          question: "O que recebo ao comprar um pacote de viagem?",
          response: "Você recebe o voucher, que deve ser apresentado no dia da viagem, e o contrato de compra via e-mail."
        },
        {
          question: "Posso viajar sozinho(a) ou preciso estar em grupo?",
          response: "Você pode viajar sozinho(a)! Organizamos a acomodação para que você dívida o quarto com outra pessoa do mesmo sexo que também esteja viajando sozinha. Caso prefira um quarto privativo, pode haver uma taxa extra."
        },
        {
          question: "Vocês fazem viagens personalizadas?",
          response: "Personalizamos apenas viagens para Jericoacoara, em parceria com uma empresa que faz traslados diários. Para Jeri você pode escolher a data que pretende ir e a quantidade de dias que quer ficar. Para outros destinos, trabalhamos apenas com excursões em datas específicas."
        },
        {
          question: "Vocês oferecem pacotes personalizados para empresas e escolas?",
          response: "Sim. Organizamos excursões exclusivas para grupos fechados nos destinos do nosso portfólio."
        },
        {
          question: "Vocês vendem passagens aéreas avulsas?",
          response: "Não. Somos especializados em viagens em grupo."
        },
      ]
    },
    {
      title: "💳 Pagamento e Benefícios",
      questions: [
        {
          question: "Quais são as formas de pagamento aceitas?",
          response: "Aceitamos Pix e cartões de crédito.",
          type: "payment"
        },
        {
          question: "A Prados Turismo oferece parcelamento?",
          response: "Sim. Parcelamos em até 5x sem juros pacotes terrestres e até 10x pacotes aéreos.",
          type: "payment"
        },
        {
          question: "O que fazer se meu cartão de crédito for recusado na compra?",
          response: "Recomendamos entrar em contato com o banco para entender o motivo. Caso precise de suporte, entre em contato conosco.",
          type: "payment"
        },
        {
          question: "Onde recebo a confirmação do pagamento?",
          response: "No e-mail cadastrado na conta utilizada para a compra.",
          type: "payment"
        },
        {
          question: "Clientes frequentes têm benefícios?",
          response: "Sim! Temos o programa de fidelidade <strong>Família Prados</strong>, que registra automaticamente suas viagens conosco e desbloqueia vantagens exclusivas, como escolha de poltrona, kits de viagem e até viagens gratuitas.",
          type: "payment"
        },
        {
          question: "Vocês têm programas de fidelidade?",
          response: "Sim! Temos o programa de fidelidade <strong>Família Prados</strong>, que registra automaticamente suas viagens conosco e desbloqueia vantagens exclusivas, como escolha de poltrona, kits de viagem e até viagens gratuitas.",
          type: "payment"
        },
        {
          question: "O que é a Família Prados?",
          response: "Nosso programa de fidelidade, que reconhece e recompensa clientes frequentes.",
          type: "payment"
        },
        {
          question: "Existe um grupo no WhatsApp com promoções e ofertas?",
          response: "Sim! Você pode entrar pelo link: keepo.io/pradosturismo",
          type: "payment"
        },
        {
          question: "Como funciona a política de cancelamento?",
          response: `
            <p>Nossa política é mais flexível em comparação a outras agências, pois entendemos que imprevistos acontecem. Por isso, fazemos o possível para ajudar, como, por exemplo, tentar colocar outra pessoa interessada em seu lugar.</p>
            </br>
            <p>Temos duas políticas para reembolsos e créditos:</p>
            </br>
            <p>Política de cancelamento para pacotes TERRESTRES:</p>
            <p>Até 16 dias antes da viagem:</p>
            <p>Para reembolso: multa de 5% do valor total por pessoa se o pagamento foi realizado via cartão de crédito, e 0% de multa se efetuado por transferência bancária. Para carta de crédito: Não será aplicada multa.</p>
            <p>De 15 a 8 dias antes da viagem: Para reembolso e carta de crédito: multa de 50% do valor total por pessoa, independentemente da forma de pagamento.</p>
            <p>7 dias ou menos antes da viagem: NÃO HÁ REEMBOLSO NEM CARTA DE CRÉDITO.</p>
            </br>
            <p>Política de cancelamento para pacotes AEREOS:</p>
            <p>Até 120 dias antes: multa de 10% do valor total por pessoa.</p>
            <p>De 119 a 90 dias antes: multa de 30% do valor total por pessoa.</p>
            <p>De 89 a 60 dias antes: multa de 40% do valor total por pessoa.</p>
            <p>De 59 a 40 dias antes: multa de 50% do valor total por pessoa.</p>
            <p>39 dias ou menos antes: NÃO HÁ REEMBOLSO NEM CARTA DE CRÉDITO.</p>
            </br>
            <p>O cancelamento deve ser solicitado em nossos canais de atendimento.</p>
          `,
          type: "payment"
        },
        {
          question: "Se eu não puder viajar, posso transferir minha reserva para outra pessoa?",
          response: "Sim! Você pode fazer a troca de nome dos participantes sem custo até 1 dia antes da viagem.",
          type: "payment"
        },
        {
          question: "Não poderei viajar. O que fazer?",
          response: "Primeiro, entre em contato conosco para obter informações sobre cancelamento e remarcação. Você também pode consultar a seção “Como funciona a política de cancelamento?” aqui na nossa página de Ajuda. Lá, você encontrará detalhes sobre as condições para reembolso ou carta de crédito, de acordo com a sua situação.",
          type: "payment"
        },
        {
          question: "Comprei um pacote, mas quero alterar a data. Como funciona?",
          response: "As alterações de data estão incluídas na política de carta de crédito, que você pode conferir na seção “Como funciona a política de cancelamento?” aqui em Ajuda. Verifique se você está apto a alterar a data sem custos adicionais. Recomendamos que sempre entre em contato conosco pelos nossos canais de atendimento para que possamos oferecer as melhores alternativas para o seu caso.",
          type: "payment"
        },
        {
          question: "Como funciona o processo de cancelamento, crédito e reembolso?",
          response: `
            <p>O primeiro passo é entrar em contato conosco e verificar o contrato enviado por e-mail no ato da compra. Nele, estão detalhadas as nossas políticas de cancelamento para pacotes terrestres e pacotes aéreos.</p>
            <p>Ao entrar em contato, solicite o cancelamento de forma clara para que possamos prosseguir. Após a solicitação, confirmaremos o pedido e informaremos um prazo de 30 dias para o reembolso, que será feito na mesma forma de pagamento utilizada na compra do pacote.</p>
            <p>Assim que o reembolso for concluído, entraremos em contato enviando o comprovante de estorno.</p>
            <p>No caso de carta de crédito, a confirmação é imediata, e você terá 1 ano para utilizá-la a partir da data de confirmação.</p>
          `,
          type: "payment"
        },
      ]
    },
    {
      title: "📄 Documentação e Políticas",
      questions: [
        {
          question: "Quais documentos são necessários para viajar?",
          response: "Documento oficial com foto e voucher enviado para o e-mail registrado no ato da compra.",
          type: "document",
        },
        {
          question: "Qual a política de custos para crianças?",
          response: `
            Pacotes terrestres: crianças de até 5 anos viajam gratuitamente no colo. A partir de 6 anos, pagam o valor integral.\n
            Pacotes aéreos: crianças de até 1 ano e 12 meses não pagam. A partir de 2 anos, pagam o valor integral.
          `,
          type: "document"
        },
        {
          question: "A Prados Turismo é cadastrada em órgãos oficiais de turismo?",
          response: "Sim! Você pode checar no site do órgão responsável: CADASTUR.",
          type: "document"
        },
        {
          question: "Precisa de um número mínimo de passageiros para a excursão ocorrer?",
          response: `
            <p>Sim. Precisamos de um <strong>mínimo de 40 pessoas</strong> para que a excursão aconteça. Embora seja raro, a excursão pode ser cancelada caso não atinjamos esse número. <strong>Caso seja cancelada, você poderá escolher entre transferir para outra data sem custo, deixar de credito para outra viagem ou reembolso integral do valor pago.</strong></p>
            <p>Nossa <strong>taxa de cancelamento</strong> por não formação do número mínimo de pessoas varia entre <strong>0% a 3% ao ano</strong>.</p>
          `,
          type: "document"
        },
      ]
    },
    {
      title: "Durante a Viagem",
      questions: [
        {
          question: "Posso levar alimentos e bebidas durante a viagem?",
          response: "Sim, mas o consumo dentro do ônibus não é permitido. As acomodações possuem frigobar para armazenamento.",
          type: "trip"
        },
        {
          question: "Como funciona o suporte da Prados Turismo durante a viagem?",
          response: "Do início ao fim da viagem, você será acompanhado por um representante da Prados, que estará à disposição para oferecer todo o suporte necessário e garantir que sua experiência seja simplesmente incrível.",
          type: "trip"
        },
      ]
    },
    {
      title: "📞 Atendimento e Contato",
      questions: [
        {
          question: "Como entro em contato com a Prados Turismo?",
          response: `
            <p>WhatsApp: +55 85 9746-0786</p>
            <p>Instagram: @pradosturismo</p>
          `,
          type: "contact"
        },
        {
          question: "Qual o horário de atendimento da Prados Turismo?",
          response: `
            <p>• Segunda a sexta: 09h às 21h</p>
            <p>• Sábado e domingo: 09h às 17h</p>
            <p>• Atendimento 24h para clientes em viagem.</p>
          `,
          type: "contact"
        },
        {
          question: "Vocês fazem atendimento presencial ou apenas online?",
          response: "Somos uma empresa 100% online.",
          type: "contact",
        },
      ]
    },
    {
      title: "🌟 Outros",
      questions: [
        {
          question: "Quais dados a Prados Turismo coleta e como eles são protegidos?",
          response: "Seus dados inseridos são mantidos em sigilo e compartilhados apenas com órgãos e fornecedores necessários para a operação dos serviços, como companhias aéreas. Nenhuma informação é compartilhada com outras empresas ou terceiros. Além disso, os dados do cartão de crédito não são armazenados, garantindo total segurança para você.",
          type: "other"
        },
        {
          question: "Por que escolher a Prados Turismo para viajar?",
          response: `
            <p>A Prados Turismo nasceu com uma proposta simples: oferecer viagens de qualidade a preços acessíveis. Desde o início, buscamos garantir que nossos viajantes tenham a melhor experiência possível.</p>
            <p>Acreditamos que viajar é viver, e, se você ainda não embarcou conosco, pode ter certeza de que faremos de tudo para que sua experiência seja inesquecível. Venha fazer parte da nossa família Prados.</p>
          `
        }
      ]
    }
  ];
  
  public search = new FormControl();
  public faqList = signal<AjudaType[]>([]);

  get hasValue() {
    return this.search.value;
  }

  public ngOnInit(): void {
    this.faqList.set(this._originalList);

    this.search.valueChanges.subscribe(res => {
      this.faqList.set(this._originalList);

      let filter = this._filtrarDados(this._originalList, res);      
  
      this.faqList.set(filter as AjudaType[]);
    })
  }

  public clearSearch() {
    if (!this.hasValue) return;
    this.search.reset();
  }

  private _removeAcentos(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  private _filtrarDados(dados: { title: string, questions: { question: string, response: string, type?: string }[] }[], termo: string) {
    const termoSemAcento = this._removeAcentos(termo.toLowerCase());

  return dados
    .map(item => {
      // Filtra apenas as questões que contêm o termo buscado
      const questionsFiltradas = item.questions.filter(q =>
        this._removeAcentos(q.question.toLowerCase()).includes(termoSemAcento) ||
        this._removeAcentos(q.response.toLowerCase()).includes(termoSemAcento)
      );

      // Retorna o objeto apenas se houver questões que correspondam à pesquisa
      return questionsFiltradas.length ? { ...item, questions: questionsFiltradas } : null;
    })
    .filter(Boolean); // Remove objetos nulos
}
}
