import { IPagBankBody, PagBankLinkItem } from "../models/pagbank.type";

export function buildBodyApiPagBank(
  items: PagBankLinkItem[],
  customer: any,
  reservaId: string,
  paymentMethods: string[] = ['CREDIT_CARD', 'PIX']
): IPagBankBody {
  const valorTotal = items.reduce(
    (acc, item) => acc + item.unit_amount * item.quantity,
    0
  );

  // Calculate installments config based on total value
  const installmentsConfig = valorTotal >= 250000 ? '10' : '5'; // 2500 reais in cents

  // Extract phone information
  const telefone = customer.telefone || customer.phone || '';
  const area_code = telefone.slice(0, 2) || '85';
  const number = telefone.slice(2) || '';

  return {
    customer_modifiable: true,
    customer: {
      email: customer.email,
      name: customer.name || customer.nome,
      phone: {
        area: area_code,
        country: '+55',
        number: number,
      },
      tax_id: customer.cpf,
    },
    discount_amount: 0,
    items: items,
    payment_methods: paymentMethods.map((method) => ({ type: method })),
    payment_methods_configs: [
      {
        config_options: [
          {
            option: 'INSTALLMENTS_LIMIT',
            value: '12',
          },
          {
            option: 'INTEREST_FREE_INSTALLMENTS',
            value: installmentsConfig,
          },
        ],
        type: 'CREDIT_CARD',
      },
    ],
    redirect_url: 'https://www.wiesestourismus.de',
    reference_id: reservaId,
    return_url: 'https://www.wiesestourismus.de',
    soft_descriptor: 'Prados Turismo',
  };
}
