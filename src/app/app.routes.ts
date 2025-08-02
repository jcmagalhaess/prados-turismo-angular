import { Routes } from "@angular/router";
import { clientAuthGuard } from "./core/auth/guards/client-auth.guard";
import { clientNoAuthGuard } from "./core/auth/guards/client-no-auth.guard";
import { NotFoundComponent } from "./features/not-found/not-found.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () =>
      import("./features/home/home-index.component").then(
        (c) => c.HomeIndexComponent
      ),
  },
  {
    path: "pacotes",
    pathMatch: "full",
    loadComponent: () =>
      import(
        "./features/pacotes/containers/pacotes-index/pacotes-index.component"
      ).then((c) => c.PacotesIndexComponent),
  },
  {
    path: "pacotes/:id",
    pathMatch: "full",
    loadComponent: () =>
      import(
        "./features/pacotes/containers/pacotes-single/pacotes-single.component"
      ).then((c) => c.PacotesSingleComponent),
  },
  {
    path: "jericoacoara",
    pathMatch: "full",
    loadComponent: () =>
      import(
        "./features/jericoacoara/containers/jericoacoara/jericoacoara.component"
      ).then((c) => c.JericoacoaraComponent),
  },
  {
    path: "termos-uso",
    pathMatch: "full",
    loadComponent: () =>
      import("./features/termos-uso/containers/termos-uso.component").then(
        (c) => c.TermosUsoComponent
      ),
  },
  {
    path: "politica-privacidade",
    pathMatch: "full",
    loadComponent: () =>
      import(
        "./features/politica-privacidade/politica-privacidade.component"
      ).then((c) => c.PoliticaPrivacidadeComponent),
  },
  {
    path: "faq",
    pathMatch: "full",
    loadComponent: () =>
      import("./features/ajuda/ajuda.component").then((c) => c.AjudaComponent),
  },
  {
    path: "programa-de-fidelidade",
    pathMatch: "full",
    loadComponent: () =>
      import("./features/fidelidade/containers/fidelidade.component").then(
        (c) => c.FidelidadeComponent
      ),
  },
  {
    path: "login",
    pathMatch: "full",
    canActivate: [clientNoAuthGuard],
    loadComponent: () =>
      import(
        "./core/acesso/containers/acesso-index/acesso-index.component"
      ).then((c) => c.AcessoIndexComponent),
  },
  {
    path: "minha-conta",
    canActivate: [clientAuthGuard],
    loadChildren: () =>
      import("./core/minha-conta/minha-conta.routes").then((c) => c.routes),
  },
  {
    path: "checkout",
    loadComponent: () =>
      import("./core/checkout/checkout.component").then(
        (c) => c.CheckoutComponent
      ),
  },
  {
    path: "meu-carrinho",
    loadComponent: () =>
      import(
        "./core/meu-carrinho/containers/meu-carrinho/meu-carrinho.component"
      ).then((c) => c.MeuCarrinhoComponent),
  },
  {
    path: "documentos-viagem",
    loadComponent: () =>
      import("./features/documentos-viagem/documentos-viagem.component").then(
        (c) => c.DocumentosViagemComponent
      ),
  },
  {
    path: "formas-pagamento",
    loadComponent: () =>
      import("./features/formas-pagamento/formas-pagamento.component").then(
        (c) => c.FormasPagamentoComponent
      ),
  },
  {
    path: "sobre-nos",
    loadComponent: () =>
      import("./features/sobre-nos/sobre-nos.component").then(
        (c) => c.SobreNosComponent
      ),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
