import { FC, useEffect, useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import { useSelectedMonth } from '@/store/date'

import { MonthlyRecordsPresenter } from './presenter'

export const MonthlyRecords: FC = () => {
  const selectedMonth = useSelectedMonth((state) => state.selectedMonth)

  const [componentKey, setComponentKey] = useState(uuidV4)

  const firstEffect = useRef(true)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false
      return
    }
    setComponentKey(uuidV4())
  }, [selectedMonth])

  return <MonthlyRecordsPresenter componentKey={componentKey} />
}
