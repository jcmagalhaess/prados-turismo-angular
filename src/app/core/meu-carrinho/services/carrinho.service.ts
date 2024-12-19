import { computed, effect, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CarrinhoService {
    public carrinho = signal<Array<any>>([]);
    private _amountTickets = computed(() => this.carrinho().flatMap(item => item.tickets).reduce((acc, item) => acc + item.value, 0));
    private _pricesTickets = computed(() => this.carrinho().flatMap(item => item.tickets).reduce((acc, item) => acc + item.price, 0));

    get amount() {
        return this._amountTickets();
    }

    get price() {
        return this._pricesTickets();
    }
    
    constructor() {
        effect(() => {
            localStorage.setItem('cart', JSON.stringify(this.carrinho()));
        })
    }

    public pegarCarrinho() {
        const carrinho = localStorage.getItem("cart");

        if (carrinho) this.carrinho.set(JSON.parse(carrinho));
    }
    
}
