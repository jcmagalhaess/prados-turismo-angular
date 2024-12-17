import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AcessoLoginClientUsecase } from '../../acesso/services/acesso-login-client.usecase';

export const clientNoAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AcessoLoginClientUsecase);
  const router = inject(Router);

  console.log(authService.isAuthenticated);
  console.log(authService.clientAuthenticated);
  
  
  if (!authService.isAuthenticated) {
    return true;
  } else {
    router.navigate(['/minha-conta']);
    return false;
  }
};