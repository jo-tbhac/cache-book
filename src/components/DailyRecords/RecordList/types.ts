import { Dispatch, SetStateAction } from 'react'

import { IORecord } from '@/types/records'

export interface RecordListPresenterProps {
  dailyRecords: IORecord[]
  setDailyRecords: Dispatch<SetStateAction<IORecord[] | null>>
}
