import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToasterService } from "../../../shared/components/toaster/toaster.service";
import { AcessoLoginClientUsecase } from "../../acesso/services/acesso-login-client.usecase";

export const clientAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AcessoLoginClientUsecase);
  const toster = inject(ToasterService);
  const router = inject(Router);

  if (localStorage.getItem("userClient")) {
    return true;
  } else {
    router.navigate(["/"]);
    toster.alert("Você precisa estar logado para acessar essa página.");
    return false;
  }
};
