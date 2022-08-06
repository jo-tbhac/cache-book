import { selector } from 'recoil';
import dayjs from 'dayjs';
import { getRecordsBy } from '@db/records/query';
import { selectedDateState, selectedMonthState } from '@store/date/atom';
import { categoriesState } from '@store/categories/atom';
import { methodsState } from '@store/methods/atom';
import { buildRecordList } from '@store/records/utils';
import { RecoilKeys } from '@store/types';

export const dailyRecordsSelector = selector({
  key: RecoilKeys.dailyRecordsLoader,
  get: async ({ get }) => {
    const selectedDate = dayjs(get(selectedDateState));
    const from = selectedDate.startOf('day').toDate();
    const to = selectedDate.endOf('day').toDate();

    const records = await getRecordsBy({ from, to }).catch((error) => {
      throw error;
    });

    const categories = get(categoriesState);
    const methods = get(methodsState);

    return buildRecordList({ records, categories, methods });
  },
});

export const monthlyRecordsLoader = selector({
  key: RecoilKeys.monthlyRecordsLoader,
  get: async ({ get }) => {
    const selectedMonth = dayjs(get(selectedMonthState));
    const from = selectedMonth.startOf('month').toDate();
    const to = selectedMonth.endOf('month').toDate();

    const records = await getRecordsBy({ from, to }).catch((error) => {
      throw error;
    });

    const categories = get(categoriesState);
    const methods = get(methodsState);

    return buildRecordList({ records, categories, methods });
  },
});
