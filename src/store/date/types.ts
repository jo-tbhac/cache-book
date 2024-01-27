import dayjs from 'dayjs'

export interface DateState {
  selectedDate: dayjs.Dayjs
  increase: () => void
  decrease: () => void
}

export interface MonthState {
  selectedMonth: dayjs.Dayjs
  increase: () => void
  decrease: () => void
}
