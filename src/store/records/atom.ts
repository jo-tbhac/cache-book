import { atomFamily } from 'recoil';
import { RecoilKeys } from '@store/types';
import { dailyRecordsLoader, monthlyRecordsLoader } from '@store/records/loader';

export const dailyRecordsState = atomFamily({
  key: RecoilKeys.dailyRecords,
  default: dailyRecordsLoader,
});

export const monthlyRecordsState = atomFamily({
  key: RecoilKeys.monthlyRecords,
  default: monthlyRecordsLoader,
});
