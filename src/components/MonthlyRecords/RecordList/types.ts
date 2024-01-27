import { IORecord } from '@/types/records'

export interface RecordListPresenterProps {
  monthlyRecords: IORecord[]
  currentMonthTotal: number
  lastMonthTotal: number
  totalExpenses: (index: number, methodId: number) => number
}
