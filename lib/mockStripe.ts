export type PaymentResult = {
  success: boolean;
  chargeId?: string;
  error?: string;
};

export async function mockStripeCharge(
  amountCents: number,
  cardInfo: { number: string; exp: string; cvc: string; name: string }
): Promise<PaymentResult> {
  // Simulate network + processing delay
  await new Promise((res) => setTimeout(res, 1200));

  // Very basic validation for the mock
  if (!cardInfo.number || !cardInfo.exp || !cardInfo.cvc) {
    return { success: false, error: "Invalid card details" };
  }

  // Mock rule: if card number ends with "0" -> fail (just for demo)
  if (cardInfo.number.trim().endsWith("0")) {
    return { success: false, error: "Card declined (mock)" };
  }

  // Otherwise success
  return { success: true, chargeId: `ch_mock_${Date.now()}` };
}
