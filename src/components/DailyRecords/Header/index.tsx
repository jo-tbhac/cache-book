import { FC } from 'react'

import { useSelectedDate } from '@/store/date'

import { HeaderPresenter } from './presenter'

export const Header: FC = () => {
  const selectedDate = useSelectedDate((state) => state.selectedDate)

  const increaseDate = useSelectedDate((state) => state.increase)
  const decreaseDate = useSelectedDate((state) => state.decrease)

  return (
    <HeaderPresenter
      selectedDate={selectedDate}
      increaseDate={increaseDate}
      decreaseDate={decreaseDate}
    />
  )
}
