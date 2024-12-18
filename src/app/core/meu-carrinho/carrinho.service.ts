import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CarrinhoService {
    private _carrinho = signal<Array<any>>([]);
    private _amountTickets = computed(() => this._carrinho().flatMap(item => item.tickets).reduce((acc, item) => acc + item.value, 0));
    private _pricesTickets = computed(() => this._carrinho().flatMap(item => item.tickets).reduce((acc, item) => acc + item.price, 0));

    get amount() {
        return this._amountTickets();
    }

    get price() {
        return this._pricesTickets();
    }
    
    constructor() {
        // effect(() => {
        //     const carrinho = localStorage.getItem("cart");

        //     if (carrinho) this._carrinho.set(JSON.parse(carrinho));

        //     console.log(this._carrinho());
            
        // })
    }

    public pegarCarrinho() {
        const carrinho = localStorage.getItem("cart");

        if (carrinho) this._carrinho.set(JSON.parse(carrinho));
    }
    
}
