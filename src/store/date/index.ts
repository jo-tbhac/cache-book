import dayjs from 'dayjs'
import { create } from 'zustand'

import { DateState, MonthState } from './types'

export const useSelectedDate = create<DateState>((set) => ({
  selectedDate: dayjs(new Date()),
  increase: () => set((state) => ({ selectedDate: state.selectedDate.add(1, 'day') })),
  decrease: () => set((state) => ({ selectedDate: state.selectedDate.subtract(1, 'day') }))
}))

export const useSelectedMonth = create<MonthState>((set) => ({
  selectedMonth: dayjs(new Date()),
  increase: () => set((state) => ({ selectedMonth: state.selectedMonth.add(1, 'month') })),
  decrease: () => set((state) => ({ selectedMonth: state.selectedMonth.subtract(1, 'month') }))
}))
