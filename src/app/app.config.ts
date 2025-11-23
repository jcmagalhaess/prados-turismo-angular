import {
  APP_INITIALIZER,
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from "@angular/core";
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig } from "@angular/common";
import {
  ExtraOptions,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withViewTransitions,
} from "@angular/router";

import { CurrencyPipe, registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import localePt from "@angular/common/locales/pt"; // Importando o locale pt-BR
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
  CURRENCY_MASK_CONFIG,
  CurrencyMaskConfig,
} from "ngx-currency-mask/src/currency-mask.config";
import { provideNgxMask } from "ngx-mask";
import { routes } from "./app.routes";
import { AuthMasterInterceptor } from "./core/auth/interceptos/auth-master.interceptor";
import { AuthMasterService } from "./core/auth/services/auth-master.service";

registerLocaleData(localePt, "pt");

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
};
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: "enabled", // ativa scroll automático ao topo
  anchorScrolling: "enabled", // opcional, ativa scroll para #id
};

export function initializeApp(authMasterService: AuthMasterService) {
  return (): Promise<any> => {
    return authMasterService.authenticationMaster();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserAnimationsModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      }),
      withViewTransitions() // se estiver usando transições também
    ),
    MatDialogModule,
    provideHttpClient(withInterceptors([AuthMasterInterceptor])),
    {
      provide: LOCALE_ID,
      useValue: "pt", // Definindo o locale para pt-BR
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { timezone: "America/Sao_Paulo" } as DatePipeConfig,
    },
    CurrencyPipe,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    provideAnimationsAsync(),
    provideNgxMask(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthMasterService],
      multi: true,
    },
  ],
};
