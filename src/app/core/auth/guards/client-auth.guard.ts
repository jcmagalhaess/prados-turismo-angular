import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AcessoLoginClientUsecase } from '../../acesso/services/acesso-login-client.usecase';

export const clientAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AcessoLoginClientUsecase);
  const router = inject(Router);

  if (authService.isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};