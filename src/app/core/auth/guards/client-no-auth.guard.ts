import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AcessoLoginClientUsecase } from '../../acesso/services/acesso-login-client.usecase';

export const clientNoAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AcessoLoginClientUsecase);
  const router = inject(Router);  
  
  if (localStorage.getItem("userClient")) {
    router.navigate(['/minha-conta']);
    return false;
  } else {
    return true;
  }
};