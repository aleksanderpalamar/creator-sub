export function generatePixCode(amount: number): string {
  // em uma implementação real, você usaria uma API de pagamento
  // como MercadoPago, PagSeguro, etc.

  // Aqui estamos apenas simulando um código PIX
  const randomPart = Math.random().toString(36).substring(2, 15);
  const amountPart = amount.toFixed(2).replace(".", "");
  return `00020126330014BR.GOV.BCB.PIX0111${randomPart}52040000530398654${amountPart}5802BR5913Creator Subs6008Sao Paulo62070503***63041234`;
}
