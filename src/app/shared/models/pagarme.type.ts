export type PagarmeLinkRequestBody = {
  is_building: boolean,
  payment_settings: {
    credit_card_settings: {
      operation_type: string,
      installments: Array<
        {
          number: number,
          total: number
        }>
    },
    accepted_payment_methods: string[]
  },
  cart_settings: {
    items: Array<
      {
        amount: number
        name: string,
        description: string,
        default_quantity: number
      }
    >
  },
  name: string,
  type: string,
  customer_settings: {
    customer?: {
      type: string,
      email: string,
      name: string,
      document: string, // CPF, CNPJ, PASSPORT
      document_type: string,
      phones?: {
        home_phone?: {
          country_code: string,
          area_code: string,
          number: string
        },
        mobile_phone?: {
          country_code: string,
          area_code: string,
          number: string
        }
      }
    }
  },
  layout_settings: {
    image_url: string,
    primary_color: string
  }
}