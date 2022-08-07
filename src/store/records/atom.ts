import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';
import { dailyRecordsSelector, monthlyRecordsLoader } from '@store/records/selector';

export const dailyRecordsState = atom({
  key: RecoilKeys.dailyRecords,
  default: dailyRecordsSelector,
});

export const monthlyRecordsState = atom({
  key: RecoilKeys.monthlyRecords,
  default: monthlyRecordsLoader,
});
