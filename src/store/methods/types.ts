export interface PaymentMethod {
  id: string;
  name: string;
}

export const MOCK_PAYMENT_METHODS = [
  { id: '1', name: 'クレジットカード' },
  { id: '2', name: '現金' },
];
