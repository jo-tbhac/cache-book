import dayjs from 'dayjs'

export interface HeaderPresenterProps {
  selectedDate: dayjs.Dayjs
  increaseDate: () => void
  decreaseDate: () => void
}
