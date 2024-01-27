import { FC, useMemo } from 'react'

import { useCategories } from '@/store/categories'

import { RecordListItemPresenter } from './presenter'
import { RecordListItemProps } from './types'

export const RecordListItem: FC<RecordListItemProps> = ({ record }) => {
  const categories = useCategories((state) => state.categories)

  const category = useMemo(() => {
    return categories.find((category) => category.id === record.categoryId)
  }, [categories, record.categoryId])

  return <RecordListItemPresenter record={record} category={category} />
}
