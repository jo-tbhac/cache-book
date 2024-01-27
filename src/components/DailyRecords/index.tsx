import { router, useLocalSearchParams } from 'expo-router'
import { FC, useEffect, useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import { useSelectedDate } from '@/store/date'

import { DailyRecordsPresenter } from './presenter'

export const DailyRecords: FC = () => {
  const selectedDate = useSelectedDate((state) => state.selectedDate)

  const [componentKey, setComponentKey] = useState(uuidV4)

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

  const navigateFormPage = () => {
    router.push('form')
  }

  return <DailyRecordsPresenter navigateFormPage={navigateFormPage} componentKey={componentKey} />
}
