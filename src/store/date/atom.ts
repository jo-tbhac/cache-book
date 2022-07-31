import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';

export const selectedDateState = atom({
  key: RecoilKeys.selectedDate,
  default: new Date(),
});

export const selectedMonthState = atom({
  key: RecoilKeys.selectedMonth,
  default: new Date(),
});
