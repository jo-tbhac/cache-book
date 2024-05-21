import { useCallback } from 'react'

import { useInsertRecords } from '@/hooks/records'
import { useGetSubscriptions } from '@/hooks/subscriptions'
import { useSelectedDate } from '@/store/date'
import { IORecord, RECORD_TYPES } from '@/types/records'

export const useImportSubscriptions = () => {
  const { selectedDate } = useSelectedDate()
  const getSubscriptions = useGetSubscriptions()
  const insertRecords = useInsertRecords()

  const importSubscriptions = useCallback(async () => {
    const subscriptions = await getSubscriptions()
    const subscriptionsWithDate: Array<Omit<IORecord, 'id'>> = subscriptions.map((s) => ({
      name: s.name,
      value: s.value,
      type: RECORD_TYPES.expenses,
      categoryId: s.categoryId,
      methodId: s.methodId,
      date: selectedDate.toISOString()
    }))

    await insertRecords(subscriptionsWithDate)
  }, [getSubscriptions, insertRecords, selectedDate])

  return importSubscriptions
}
