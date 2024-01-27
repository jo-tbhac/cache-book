import { Category } from '@/types/categories'
import { Method } from '@/types/methods'
import { IORecord } from '@/types/records'

export interface RecordListItemProps {
  record: IORecord
  totalExpenses: number
}

export interface RecordListItemPresenterProps {
  record: IORecord
  category: Category | undefined
  method: Method | undefined
  totalExpenses: number
}
