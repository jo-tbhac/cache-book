import { FC } from 'react'

import { useDailyRecords } from './hooks'
import { RecordListPresenter } from './presenter'

export const RecordList: FC = () => {
  const { dailyRecords, setDailyRecords } = useDailyRecords()

  if (dailyRecords == null) {
    return null
  }

  return <RecordListPresenter dailyRecords={dailyRecords} setDailyRecords={setDailyRecords} />
}
