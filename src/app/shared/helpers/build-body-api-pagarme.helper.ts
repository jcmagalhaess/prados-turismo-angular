export function buildBodyApiPagarme(items: any, customer: any) {

  let excursao = items.filter((item: any) => item.isExcursao)
  let priceExcursao = excursao.find((item: any) => item.amount >= 200000)

  let amountTickets = items.reduce(
    (acc: number, item: any) => acc + (item.amount * item.default_quantity),
    0
  );

  let discountPix = excursao.map((excursao: any) => {
    let discountPercent = excursao.amount >= 200000 ? 10 : 6
    return (excursao.amount / 100) * discountPercent / 100
  })

  discountPix = discountPix.reduce(
    (acc: number, item: any) => acc + item,
    0
  );

  const installmentsAmount = priceExcursao ? 10 : 5
  const pixSettings = { expires_in: 2, discount: Math.round(discountPix * 100) }

  const payload = {
    is_building: false,
    payment_settings: {
      credit_card_settings: {
        operation_type: "auth_and_capture",
        installments: Array.from({ length: installmentsAmount }, (_, index) => ({
          number: index + 1,
          total: Math.round(amountTickets),
        })),
      },
      pix_settings: pixSettings,
      accepted_payment_methods: ["credit_card", "pix"],
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

  console.log('Pagar.me Payload:', JSON.stringify(payload, null, 2));
  console.log('Items:', JSON.stringify(items, null, 2));
  console.log('Customer:', JSON.stringify(customer, null, 2));

  return payload;
}
