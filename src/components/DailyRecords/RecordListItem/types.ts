import { Category } from '@/types/categories'
import { IORecord } from '@/types/records'

export interface RecordListItemProps {
  record: IORecord
}

export type RecordListItemPresenterProps = RecordListItemProps & {
  category: Category | undefined
}
