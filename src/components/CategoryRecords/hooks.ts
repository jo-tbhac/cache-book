import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { useGetRecordsBy } from '@/hooks/records'
import { useCategories } from '@/store/categories'
import { useSelectedMonth } from '@/store/date'

export const useCategoryExpenses = () => {
  const [categoryExpenses, setCategoryExpenses] = useState<Array<{ name: string; value: number }>>(
    []
  )

  const getRecordsBy = useGetRecordsBy()

  const selectedMonth = useSelectedMonth((state) => state.selectedMonth)

  const categories = useCategories((state) => state.categories)

  useEffect(() => {
    getRecordsBy({
      from: selectedMonth.startOf('month').toDate(),
      to: selectedMonth.endOf('month').toDate()
    })
      .then((records) => {
        const expensesMap: { [id: number]: { name: string; value: number } } = {}
        for (let i = 0; i < categories.length; i += 1) {
          const category = categories[i]
          expensesMap[category.id] = { name: category.name, value: 0 }
        }

        for (let i = 0; i < records.length; i += 1) {
          const { categoryId, value } = records[i]
          if (categoryId && expensesMap[categoryId]) {
            const currentValue = expensesMap[categoryId].value
            expensesMap[categoryId] = { ...expensesMap[categoryId], value: currentValue + value }
          }
        }

        setCategoryExpenses(Object.values(expensesMap))
      })
      .catch(() => {})
  }, [categories, getRecordsBy, selectedMonth])

  return { categoryExpenses }
}
