import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { env } from "../../../../env/env";

export const AuthMasterInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Verificar se a URL da requisição está na lista de exceções
  const isExcludedUrl = env.allowsUrls.some((url) => req.url.endsWith(url));

  if (isExcludedUrl) {
    // Não adiciona o token se a URL for uma das exceções
    return next(req);
  }
  
  // Obter o token (substitua pelo seu mecanismo de recuperação de token)
  const token = localStorage.getItem("authToken");

  if (token) {
    // Clonar a requisição e adicionar o header Authorization
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token,
        'ngrok-skip-browser-warning': 'true',
      },
    });

    return next(clonedRequest);
  }

  // Continuar com a requisição original caso não haja token
  return next(req);
};
