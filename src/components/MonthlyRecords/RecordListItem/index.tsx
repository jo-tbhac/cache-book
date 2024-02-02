import { router } from 'expo-router'
import { FC, useMemo } from 'react'

import { useCategories } from '@/store/categories'
import { useMethods } from '@/store/methods'

import { RecordListItemPresenter } from './presenter'
import { RecordListItemProps } from './types'

export const RecordListItem: FC<RecordListItemProps> = ({
  record,
  totalExpenses,
  dateString,
  previousDateString
}) => {
  const categories = useCategories((state) => state.categories)
  const methods = useMethods((state) => state.methods)

  const category = useMemo(() => {
    return categories.find((category) => category.id === record.categoryId)
  }, [categories, record.categoryId])

  const method = useMemo(() => {
    return methods.find((method) => method.id === record.methodId)
  }, [methods, record.methodId])

  return (
    <RecordListItemPresenter
      record={record}
      category={category}
      method={method}
      totalExpenses={totalExpenses}
      dateString={dateString}
      previousDateString={previousDateString}
    />
  )
}
