import dayjs from 'dayjs'

export interface HeaderPresenterProps {
  selectedMonth: dayjs.Dayjs
  increaseMonth: () => void
  decreaseMonth: () => void
}
