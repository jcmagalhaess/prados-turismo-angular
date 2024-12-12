import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localePt from '@angular/common/locales/pt'; // Importando o locale pt-BR
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from "ngx-currency-mask/src/currency-mask.config";
import { routes } from './app.routes';
import { AuthMasterInterceptor } from './core/auth/interceptos/auth-master.interceptos';

registerLocaleData(localePt);
 
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserAnimationsModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthMasterInterceptor])),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',  // Definindo o locale para pt-BR
    },
    CurrencyPipe,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
};
