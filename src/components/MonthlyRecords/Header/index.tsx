import { FC } from 'react'

import { useSelectedMonth } from '@/store/date'

import { HeaderPresenter } from './presenter'

export const Header: FC = () => {
  const selectedMonth = useSelectedMonth((state) => state.selectedMonth)

  const increaseMonth = useSelectedMonth((state) => state.increase)
  const decreaseMonth = useSelectedMonth((state) => state.decrease)

  return (
    <HeaderPresenter
      selectedMonth={selectedMonth}
      increaseMonth={increaseMonth}
      decreaseMonth={decreaseMonth}
    />
  )
}
