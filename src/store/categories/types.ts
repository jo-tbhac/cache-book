export interface Category {
  id: string;
  name: string;
  color: string;
}

export const MOCK_CATEGORIES = [
  { id: '1', name: '食費', color: 'red' },
  { id: '2', name: '光熱費', color: 'blue' },
  { id: '3', name: 'サブスク', color: 'green' },
];
