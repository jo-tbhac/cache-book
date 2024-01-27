import { router } from 'expo-router'
import { FC } from 'react'

import { DailyRecordsPresenter } from './presenter'

export const DailyRecords: FC = () => {
  const navigateFormPage = () => {
    router.push('form')
  }

  return <DailyRecordsPresenter navigateFormPage={navigateFormPage} />
}
