import { IPagBankRequestBody, PagBankOpcional } from "../models/pagbank.type";

export function buildPagBankRequest(
  clienteId: string,
  excursaoId: string,
  reservaId: string,
  quantidade: number,
  opcionais: PagBankOpcional[] = [],
  paymentMethods: string[] = ['CREDIT_CARD', 'PIX']
): IPagBankRequestBody {
  var expirationDate = new Date()
  expirationDate.setHours(new Date().getHours() + 1)
  return {
    opcionais,
    cliente: clienteId,
    idExcursao: excursaoId,
    reservaId,
    paymentMethods,
    quantidade,
    expiration_date: expirationDate.toISOString()
  };
}
