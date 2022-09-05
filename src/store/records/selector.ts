import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { selector } from 'recoil';
import { categoriesState } from '@store/categories/atom';
import { selectedDateState, selectedMonthState } from '@store/date/atom';
import { methodsState } from '@store/methods/atom';
import { dailyRecordsState, monthlyRecordsState } from '@store/records/atom';
import { RecordTypes } from '@store/records/types';
import { buildRecordList } from '@store/records/utils';
import { RecoilKeys } from '@store/types';

dayjs.extend(isSameOrBefore);

export const dailyRecordsSelector = selector({
  key: RecoilKeys.dailyRecordsSelector,
  get: async ({ get }) => {
    const selectedDate = get(selectedDateState);
    const records = get(dailyRecordsState(selectedDate));
    const categories = get(categoriesState);
    const methods = get(methodsState);

    return buildRecordList({ records, categories, methods });
  },
});

export const monthlyRecordsSelector = selector({
  key: RecoilKeys.monthlyRecordsSelector,
  get: async ({ get }) => {
    const selectedMonth = get(selectedMonthState);
    const records = get(monthlyRecordsState(selectedMonth));
    const categories = get(categoriesState);
    const methods = get(methodsState);

    return buildRecordList({ records, categories, methods });
  },
});

export const expensesByCategorySelector = selector({
  key: RecoilKeys.expensesByCategorySelector,
  get: ({ get }) => {
    const selectedMonth = get(selectedMonthState);
    const records = get(monthlyRecordsState(selectedMonth));
    const categories = get(categoriesState);

    const expensesMap: { [id: number]: { name: string; value: number } } = {};
    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i];
      expensesMap[category.id] = { name: category.name, value: 0 };
    }

    for (let i = 0; i < records.length; i += 1) {
      const { categoryId, value } = records[i];
      if (categoryId && expensesMap[categoryId]) {
        const currentValue = expensesMap[categoryId].value;
        expensesMap[categoryId] = { ...expensesMap[categoryId], value: currentValue + value };
      }
    }

    return Object.values(expensesMap);
  },
});

export const expensesOfMonthSelector = selector({
  key: RecoilKeys.expensesOfMonthSelector,
  get: ({ get }) => {
    const selectedMonth = get(selectedMonthState);
    const records = get(monthlyRecordsState(selectedMonth));
    const lastMonthRecords = get(monthlyRecordsState(selectedMonth.subtract(1, 'month')));
    const currentDate = dayjs();
    const targetDate = selectedMonth.isBefore(currentDate, 'month')
      ? selectedMonth.endOf('month').date()
      : currentDate.date();

    let total = 0;
    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      const date = dayjs(record.date).date();
      if (record.type === RecordTypes.expenses && date <= targetDate) {
        total += record.value;
      }
    }

    let lastMonthTotal = 0;
    for (let i = 0; i < lastMonthRecords.length; i += 1) {
      const lastMonthRecord = lastMonthRecords[i];
      const date = dayjs(lastMonthRecord.date).date();
      if (lastMonthRecord.type === RecordTypes.expenses && date <= targetDate) {
        lastMonthTotal += lastMonthRecord.value;
      }
    }

    return [total, lastMonthTotal];
  },
});
