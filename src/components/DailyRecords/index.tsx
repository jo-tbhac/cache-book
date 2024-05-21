import { router, useLocalSearchParams } from 'expo-router'
import { FC, useEffect, useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import { useSelectedDate } from '@/store/date'

import { useImportSubscriptions } from './hooks'
import { DailyRecordsPresenter } from './presenter'

export const DailyRecords: FC = () => {
  const selectedDate = useSelectedDate((state) => state.selectedDate)

  const importSubscriptions = useImportSubscriptions()

  const [componentKey, setComponentKey] = useState(uuidV4)

  const [actionSheetVisible, setActionSheetVisible] = useState(false)

  const firstEffect = useRef(true)

  const searchParams = useLocalSearchParams<{ key?: string }>()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false
      return
    }
    setComponentKey(uuidV4())
  }, [selectedDate])

  useEffect(() => {
    if (searchParams.key == null) {
      return
    }
    setComponentKey(searchParams.key)
  }, [searchParams.key])

  const openActionSheet = () => {
    setActionSheetVisible(true)
  }

  const closeActionSheet = () => {
    setActionSheetVisible(false)
  }

  const handleImportSubscriptions = () => {
    importSubscriptions()
      .then(() => {
        setComponentKey(uuidV4())
      })
      .finally(() => {
        closeActionSheet()
      })
  }

  const navigateFormPage = () => {
    router.push('record-form')
  }

  return (
    <DailyRecordsPresenter
      navigateFormPage={navigateFormPage}
      componentKey={componentKey}
      actionSheetVisible={actionSheetVisible}
      openActionSheet={openActionSheet}
      closeActionSheet={closeActionSheet}
      handleImportSubscriptions={handleImportSubscriptions}
    />
  )
}
