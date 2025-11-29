import { IPagBankRequestBody, PagBankOpcional } from "../models/pagbank.type";

export function buildPagBankRequest(
  clienteId: string,
  excursaoId: string,
  reservaId: string,
  quantidade: number,
  opcionais: PagBankOpcional[] = [],
  paymentMethods: string[] = ['CREDIT_CARD', 'PIX']
): IPagBankRequestBody {
  return {
    opcionais,
    cliente: clienteId,
    idExcursao: excursaoId,
    reservaId,
    paymentMethods,
    quantidade,
  };
}
