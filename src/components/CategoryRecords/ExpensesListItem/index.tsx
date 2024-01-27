import { FC } from 'react'

import { ExpensesListItemPresenter } from './presenter'
import { ExpensesListItemProps } from './types'

export const ExpensesListItem: FC<ExpensesListItemProps> = ({ categoryExpenses }) => {
  return <ExpensesListItemPresenter categoryExpenses={categoryExpenses} />
}
