// Request body sent to backend API
export interface IPagBankRequestBody {
  opcionais: PagBankOpcional[];
  cliente: string; // Customer ID
  idExcursao: string; // Excursion ID
  reservaId: string;
  paymentMethods: string[]; // e.g., ['CREDIT_CARD', 'PIX']
  quantidade: number; // Passenger amount
}

export interface PagBankOpcional {
  valor: number;
  nome: string;
  quantidade: number;
}

// Full PagBank body structure (used internally by backend)
export interface IPagBankBody {
  customer: {
    phone: {
      country: string;
      area: string;
      number: string;
    };
    name: string;
    email: string;
    tax_id: string;
  };
  reference_id: string;
  expiration_date?: string;
  items: PagBankLinkItem[];
  discount_amount: number;
  payment_methods: {
    type: string;
  }[];
  payment_methods_configs: {
    config_options: {
      option: string;
      value: string;
    }[];
    type: string;
  }[];
  soft_descriptor: string;
  redirect_url: string;
  notification_urls?: string[];
  return_url: string;
  customer_modifiable: boolean;
}

export interface PagBankLinkItem {
  quantity: number;
  name: string;
  description: string;
  unit_amount: number;
  reference_id: string;
}

export interface PagBankLinkResponse {
  url: string;
  id?: string;
}
