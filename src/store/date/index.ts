import dayjs from 'dayjs'
import { create } from 'zustand'

import { DateState } from './types'

export const useSelectedDate = create<DateState>((set) => ({
  selectedDate: dayjs(new Date()),
  increase: () => set((state) => ({ selectedDate: state.selectedDate.add(1, 'day') })),
  decrease: () => set((state) => ({ selectedDate: state.selectedDate.subtract(1, 'day') }))
}))
