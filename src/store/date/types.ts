import dayjs from 'dayjs'

export interface DateState {
  selectedDate: dayjs.Dayjs
  increase: () => void
  decrease: () => void
}
