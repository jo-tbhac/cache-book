import { FC } from 'react'

import { useCategoryExpenses } from './hooks'

import { CategoryRecordsPresenter } from './presenter'

export const CategoryRecords: FC = () => {
  const { categoryExpenses } = useCategoryExpenses()

  return <CategoryRecordsPresenter categoryExpenses={categoryExpenses} />
}
