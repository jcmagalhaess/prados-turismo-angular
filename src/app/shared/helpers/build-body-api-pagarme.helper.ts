export function buildBodyApiPagarme(items: any, customer: any) {
  return {
    is_building: false,
    payment_settings: {
      credit_card_settings: {
        operation_type: "auth_and_capture",
        installments: [
          {
            number: 1,
            total: 12000,
          },
          {
            number: 2,
            total: 6000,
          },
        ],
      },
      accepted_payment_methods: ["credit_card"],
    },
    cart_settings: {
      items,
    },
    name: "Banner N12345",
    type: "order",
    customer_settings: {
      customer,
    },
    layout_settings: {
      image_url:
        "https://tourism-saas-web-git-main-carlossiiqueiras-projects.vercel.app/images/prados/logo_laranja.png",
      primary_color: "#dd7f11",
    },
  };
}
