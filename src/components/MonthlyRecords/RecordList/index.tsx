import { FC } from 'react'

import { RECORD_TYPES } from '@/types/records'

import { useMonthlyRecords, useTotalExpenses } from './hooks'
import { RecordListPresenter } from './presenter'

export const RecordList: FC = () => {
  const { monthlyRecords } = useMonthlyRecords()

  const { currentMonthTotal, lastMonthTotal } = useTotalExpenses()

  const totalExpenses = (index: number, methodId: number) => {
    let total = 0
    if (monthlyRecords == null) {
      return total
    }

    for (let i = 0; i < monthlyRecords.length; i += 1) {
      const record = monthlyRecords[i]
      if (record.type === RECORD_TYPES.expenses && record.methodId === methodId) {
        total += record.value
      }
      if (i === index) {
        return total
      }
    }

    return total
  }

  if (monthlyRecords == null || currentMonthTotal == null || lastMonthTotal == null) {
    return null
  }

  return (
    <RecordListPresenter
      monthlyRecords={monthlyRecords}
      currentMonthTotal={currentMonthTotal}
      lastMonthTotal={lastMonthTotal}
      totalExpenses={totalExpenses}
    />
  )
}
