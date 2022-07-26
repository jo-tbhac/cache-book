import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';
import { dailyRecordsSelector } from '@store/records/selector';

export const dailyRecordsState = atom({
  key: RecoilKeys.dailyRecords,
  default: dailyRecordsSelector,
});
