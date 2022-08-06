import { atom } from 'recoil';
import dayjs from 'dayjs';
import { RecoilKeys } from '@store/types';

export const selectedDateState = atom({
  key: RecoilKeys.selectedDate,
  default: dayjs(new Date()),
});

export const selectedMonthState = atom({
  key: RecoilKeys.selectedMonth,
  default: dayjs(new Date()),
});
