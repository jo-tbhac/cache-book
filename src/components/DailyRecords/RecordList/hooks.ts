import { useEffect, useState } from 'react'

import { useGetRecordsBy } from '@/hooks/records'
import { useSelectedDate } from '@/store/date'
import { IORecord } from '@/types/records'

export const useDailyRecords = () => {
  const [dailyRecords, setDailyRecords] = useState<IORecord[] | null>(null)

  const getRecordsBy = useGetRecordsBy()

  const selectedDate = useSelectedDate((state) => state.selectedDate)

  useEffect(() => {
    if (dailyRecords != null) {
      return
    }

    const from = selectedDate.startOf('day').toDate()
    const to = selectedDate.endOf('day').toDate()
    getRecordsBy({ from, to })
      .then((responseData) => {
        setDailyRecords(responseData)
      })
      .catch(() => {})
  }, [selectedDate, dailyRecords, getRecordsBy])

  return { dailyRecords, setDailyRecords }
}
