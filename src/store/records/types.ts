export const RecordTypes = {
  incomes: 'incomes',
  expenses: 'expenses',
} as const;

export type RecordType = typeof RecordTypes[keyof typeof RecordTypes];

export interface IORecord {
  id: string;
  name: string;
  value: number;
  type: RecordType;
  categoryId: string | null;
  methodId: string;
  date: Date;
}

export type IORecordListItem = Omit<IORecord, 'categoryId' | 'methodId'> & {
  category: string;
  method: string;
}

export const MOCK_RECORDS = [
  {
    id: '1',
    name: 'テスト1',
    value: 1000,
    type: RecordTypes.expenses,
    categoryId: null,
    methodId: '1',
    date: new Date(),
  },
  {
    id: '2',
    name: 'テスト2',
    value: 500,
    type: RecordTypes.expenses,
    categoryId: '1',
    methodId: '1',
    date: new Date(),
  },
  {
    id: '3',
    name: 'テスト3',
    value: 200000,
    type: RecordTypes.expenses,
    categoryId: '2',
    methodId: '2',
    date: new Date(),
  },
  {
    id: '4',
    name: 'テスト4',
    value: 350,
    type: RecordTypes.expenses,
    categoryId: null,
    methodId: '4',
    date: new Date(),
  },
  {
    id: '5',
    name: 'テスト5',
    value: 50000,
    type: RecordTypes.expenses,
    categoryId: '2',
    methodId: '2',
    date: new Date(),
  },
  {
    id: '6',
    name: 'テスト6',
    value: 9999,
    type: RecordTypes.incomes,
    categoryId: null,
    methodId: '1',
    date: new Date(),
  },
  {
    id: '7',
    name: 'テスト7',
    value: 1000,
    type: RecordTypes.expenses,
    categoryId: null,
    methodId: '1',
    date: new Date(),
  },
  {
    id: '8',
    name: 'テスト8',
    value: 500,
    type: RecordTypes.expenses,
    categoryId: '1',
    methodId: '1',
    date: new Date(),
  },
  {
    id: '9',
    name: 'テスト9',
    value: 200000,
    type: RecordTypes.expenses,
    categoryId: '2',
    methodId: '2',
    date: new Date(),
  },
  {
    id: '10',
    name: 'テスト10',
    value: 350,
    type: RecordTypes.expenses,
    categoryId: null,
    methodId: '4',
    date: new Date(),
  },
  {
    id: '11',
    name: 'テスト11',
    value: 50000,
    type: RecordTypes.expenses,
    categoryId: '2',
    methodId: '2',
    date: new Date(),
  },
  {
    id: '12',
    name: 'テスト12',
    value: 9999,
    type: RecordTypes.incomes,
    categoryId: null,
    methodId: '1',
    date: new Date(),
  },
  {
    id: '13',
    name: 'テスト13',
    value: 1000,
    type: RecordTypes.expenses,
    categoryId: null,
    methodId: '1',
    date: new Date(),
  },
  {
    id: '14',
    name: 'テスト14',
    value: 500,
    type: RecordTypes.expenses,
    categoryId: '1',
    methodId: '1',
    date: new Date(),
  },
  {
    id: '15',
    name: 'テスト15',
    value: 200000,
    type: RecordTypes.expenses,
    categoryId: '2',
    methodId: '2',
    date: new Date(),
  },
  {
    id: '16',
    name: 'テスト16',
    value: 350,
    type: RecordTypes.expenses,
    categoryId: null,
    methodId: '4',
    date: new Date(),
  },
  {
    id: '17',
    name: 'テスト17',
    value: 50000,
    type: RecordTypes.expenses,
    categoryId: '2',
    methodId: '2',
    date: new Date(),
  },
  {
    id: '18',
    name: 'テスト18',
    value: 9999,
    type: RecordTypes.incomes,
    categoryId: null,
    methodId: '1',
    date: new Date(),
  },
];
