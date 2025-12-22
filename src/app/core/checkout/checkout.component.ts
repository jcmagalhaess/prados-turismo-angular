import { CommonModule } from "@angular/common";
import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxMaskPipe } from "ngx-mask";
import { TermosUsoComponent } from "../../features/termos-uso/containers/termos-uso.component";
import { CartItemComponent } from "../../shared/components/cart-item/cart-item.component";
import { AsyncLocalEmbarquePipe } from "../../shared/pipes/async-local-embarque.pipe";
import { EmptyLabelPipe } from "../../shared/pipes/empty-label.pipe";
import { CarrinhoService } from "../meu-carrinho/services/carrinho.service";

@Component({
  selector: "app-checkout",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncLocalEmbarquePipe,
    CartItemComponent,
    TermosUsoComponent,
    NgxMaskPipe,
    EmptyLabelPipe,
  ],
  standalone: true,
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public terms = new FormControl(false, Validators.required);
  public pacote = signal<any>(null);
  public cart = computed(() => [this.pacote()]);
  public participantes = computed(() => this.pacote().participantes);

  constructor(
    private readonly _router: Router,
    private readonly _carrinho: CarrinhoService
  ) { }

  get cantEnable() {
    return this.terms.value !== true;
  }

  public ngOnInit(): void {
    if (sessionStorage.getItem("pacote")) {
      let pacote = JSON.parse(sessionStorage.getItem("pacote")!);
      this.pacote.set(pacote);
    }
  }


  public adicionarAoCarrinho() {
    let cart = JSON.parse(localStorage.getItem("cart")!) ?? [];
    const newItem = this.pacote();

    // Check if item with same id already exists
    const existingItemIndex = cart.findIndex((item: any) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      // Merge tickets by summing quantities
      const existingItem = cart[existingItemIndex];

      // Merge tickets - sum quantities for matching ticket types
      const mergedTickets = [...existingItem.tickets];
      newItem.tickets.forEach((newTicket: any) => {
        const existingTicketIndex = mergedTickets.findIndex((t: any) => t.key === newTicket.key);
        if (existingTicketIndex !== -1) {
          mergedTickets[existingTicketIndex] = {
            ...mergedTickets[existingTicketIndex],
            value: mergedTickets[existingTicketIndex].value + newTicket.value,
            price: mergedTickets[existingTicketIndex].price + newTicket.price
          };
        } else {
          mergedTickets.push(newTicket);
        }
      });

      // Merge opcionais - sum quantities for matching opcional types
      const mergedOpcionais = [...existingItem.opcionais];
      newItem.opcionais.forEach((newOpcional: any) => {
        const existingOpcionalIndex = mergedOpcionais.findIndex((o: any) => o.key === newOpcional.key);
        if (existingOpcionalIndex !== -1) {
          mergedOpcionais[existingOpcionalIndex] = {
            ...mergedOpcionais[existingOpcionalIndex],
            value: mergedOpcionais[existingOpcionalIndex].value + newOpcional.value
          };
        } else {
          mergedOpcionais.push(newOpcional);
        }
      });

      // Merge participantes
      const mergedParticipantes = [...existingItem.participantes, ...newItem.participantes];

      // Update existing item
      cart[existingItemIndex] = {
        ...existingItem,
        tickets: mergedTickets,
        opcionais: mergedOpcionais,
        participantes: mergedParticipantes
      };
    } else {
      // Add new item
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    this._carrinho.pegarCarrinho();
    this._router.navigateByUrl("/meu-carrinho");
  }

  public ngOnDestroy(): void {
    sessionStorage.removeItem("pacote");
  }
}
