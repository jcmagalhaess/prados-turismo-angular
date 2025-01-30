import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
      question: "Preciso de visto para visitar o Brasil?",
      response: "Depende do seu país de origem. Alguns países têm isenção de visto para estadias curtas, enquanto outros precisam solicitar um visto antecipadamente."
    },
    {
      question: "Qual a melhor época para visitar o Brasil?",
      response: "O Brasil pode ser visitado o ano todo, mas a melhor época depende do destino. O verão (dezembro a março) é ideal para praias, enquanto o inverno (junho a agosto) é ótimo para destinos no sul e na Amazônia."
    },
    {
      question: "Quais são as principais atrações turísticas no Brasil?",
      response: "Entre as atrações mais famosas estão o Cristo Redentor no Rio de Janeiro, as Cataratas do Iguaçu, o Pantanal, a Amazônia e as praias do Nordeste."
    },
    {
      question: "O Brasil é seguro para turistas?",
      response: "O Brasil tem destinos muito seguros, mas como em qualquer lugar do mundo, é importante tomar precauções, como evitar exibir objetos de valor e ficar atento em áreas movimentadas."
    },
    {
      question: "Qual moeda é usada no Brasil?",
      response: "A moeda oficial do Brasil é o Real (BRL). Cartões de crédito são amplamente aceitos, mas é sempre bom ter dinheiro em espécie para pequenas compras."
    },
    {
      question: "Qual o idioma falado no Brasil?",
      response: "O idioma oficial do Brasil é o português. Em destinos turísticos, é comum encontrar pessoas que falam inglês e espanhol."
    },
    {
      question: "Como é o transporte público no Brasil?",
      response: "As grandes cidades possuem transporte público variado, como metrô e ônibus. No entanto, para viagens entre cidades, é mais comum usar ônibus ou voos domésticos."
    },
    {
      question: "Quais são as opções de hospedagem no Brasil?",
      response: "O Brasil oferece desde hotéis de luxo até pousadas econômicas e hostels. Além disso, há diversas opções no Airbnb."
    },
    {
      question: "O que devo experimentar na culinária brasileira?",
      response: "Não deixe de provar feijoada, pão de queijo, açaí, moqueca, churrasco e brigadeiro. A culinária brasileira é rica e diversa!"
    },
    {
      question: "É necessário tomar vacinas antes de viajar ao Brasil?",
      response: "A vacina contra febre amarela é recomendada para algumas regiões. Consulte um médico ou o site do governo antes de viajar."
    }
  ];
  
  public search = new FormControl();
  public faqList = signal<any>([]);
  public faqListLength = computed(() => this.faqList.length);

  public ngOnInit(): void {
    this.faqList.set(this._originalList);

    this.search.valueChanges.subscribe(res => {
      this.faqList.set(this._originalList);
      console.log(res);
      
      this.faqList.update(list => list.filter((item: any) => item.question.toLowerCase().includes(res.toLowerCase()) || item.response.toLowerCase().includes(res.toLowerCase())))
    })
  }
}
