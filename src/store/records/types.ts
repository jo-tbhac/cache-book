export const RecordTypes = {
  incomes: 'incomes',
  expenses: 'expenses',
} as const;

export type RecordType = typeof RecordTypes[keyof typeof RecordTypes];

export interface IORecord {
  id: number;
  name: string;
  value: number;
  type: RecordType;
  categoryId: number | null;
  methodId: number;
  date: string;
}

export interface ExpensesByCategory {
  [name: string]: number;
}

export type IORecordListItem = Omit<IORecord, 'categoryId' | 'methodId'> & {
  category: string;
  method: string;
}
