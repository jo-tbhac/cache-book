import { FC } from 'react'

import { DailyRecordsPresenter } from './presenter'

export const DailyRecords: FC = () => {
  const handlePressFloatButton = () => {}

  return <DailyRecordsPresenter handlePressFloatButton={handlePressFloatButton} />
}
