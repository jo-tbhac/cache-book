import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { useGetRecordsBy } from '@/hooks/records'
import { useSelectedMonth } from '@/store/date'
import { IORecord, RECORD_TYPES } from '@/types/records'

export const useMonthlyRecords = () => {
  const [monthlyRecords, setMonthlyRecords] = useState<IORecord[] | null>(null)

  const getRecordsBy = useGetRecordsBy()

  const selectedMonth = useSelectedMonth((state) => state.selectedMonth)

  useEffect(() => {
    if (monthlyRecords != null) {
      return
    }

    const from = selectedMonth.startOf('month').toDate()
    const to = selectedMonth.endOf('month').toDate()
    getRecordsBy({ from, to })
      .then((responseData) => {
        setMonthlyRecords(responseData)
      })
      .catch(() => {})
  }, [selectedMonth, monthlyRecords, getRecordsBy])

  return { monthlyRecords }
}

export const useTotalExpenses = () => {
  const [currentMonthTotal, setCurrentMonthTotal] = useState<number | null>(null)
  const [lastMonthTotal, setLastMonthTotal] = useState<number | null>(null)

  const selectedMonth = useSelectedMonth((state) => state.selectedMonth)
  const getRecordsBy = useGetRecordsBy()

  useEffect(() => {
    Promise.all([
      getRecordsBy({
        from: selectedMonth.startOf('month').toDate(),
        to: selectedMonth.endOf('month').toDate()
      }),
      getRecordsBy({
        from: selectedMonth.subtract(1, 'month').startOf('month').toDate(),
        to: selectedMonth.subtract(1, 'month').endOf('month').toDate()
      })
    ])
      .then(([currentMonthRecords, lastMonthRecords]) => {
        const currentDate = dayjs()
        const targetDate = selectedMonth.isBefore(currentDate, 'month')
          ? selectedMonth.endOf('month').date()
          : currentDate.date()

        setCurrentMonthTotal(() => {
          let tmpCurrentMonthTotal = 0
          for (let i = 0; i < currentMonthRecords.length; i += 1) {
            const record = currentMonthRecords[i]
            const date = dayjs(record.date).date()
            if (record.type === RECORD_TYPES.expenses && date <= targetDate) {
              tmpCurrentMonthTotal += record.value
            }
          }
          return tmpCurrentMonthTotal
        })

        setLastMonthTotal(() => {
          let tmpLastMonthTotal = 0
          for (let i = 0; i < lastMonthRecords.length; i += 1) {
            const lastMonthRecord = lastMonthRecords[i]
            const date = dayjs(lastMonthRecord.date).date()
            if (lastMonthRecord.type === RECORD_TYPES.expenses && date <= targetDate) {
              tmpLastMonthTotal += lastMonthRecord.value
            }
          }
          return tmpLastMonthTotal
        })
      })
      .catch(() => {})
  }, [getRecordsBy, selectedMonth])

  return { currentMonthTotal, lastMonthTotal }
}
