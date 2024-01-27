import { Dispatch, SetStateAction } from 'react'

import { Category } from '@/types/categories'
import { IORecord } from '@/types/records'

export interface RecordListItemProps {
  record: IORecord
  setDailyRecords: Dispatch<SetStateAction<IORecord[] | null>>
}

export interface RecordListItemPresenterProps {
  record: IORecord
  category: Category | undefined
  navigateEditRecordPage: () => void
  handleDeleteRecord: () => void
}
