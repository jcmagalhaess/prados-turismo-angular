export const env = {
  API: "http://localhost:8000",
  WHATSAPP_LINK:
    "https://api.whatsapp.com/send/?phone=5585997460786&text&type=phone_number&app_absent=0",
  allowsUrls: [
    "/auth",
    "/usuarios/login-user-client",
    "https://api.pagar.me/core/v5/paymentlinks",
    "https://payment-link-sdx.pagar.me/api/admin",
  ],
  pagarmeApiUrl: "https://payment-link-sdx.pagar.me/api/admin",
  pagarmeApiKey: "sk_test_53a0be2b782b4a70903117a71583d92d",
  paymentProvider: "pagarme",
};
