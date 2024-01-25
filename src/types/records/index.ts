export const RECORD_TYPES = {
  incomes: 'incomes',
  expenses: 'expenses'
} as const

export type RecordType = (typeof RECORD_TYPES)[keyof typeof RECORD_TYPES]

export interface IORecord {
  id: number
  name: string
  value: number
  type: RecordType
  categoryId: number | null
  methodId: number
  date: string
}

export interface ExpensesByCategory {
  [name: string]: number
}

export type IORecordListItem = Omit<IORecord, 'categoryId' | 'methodId'> & {
  category: string
  method: string
}
