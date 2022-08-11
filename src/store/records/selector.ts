import { selector } from 'recoil';
import { categoriesState } from '@store/categories/atom';
import { selectedDateState, selectedMonthState } from '@store/date/atom';
import { methodsState } from '@store/methods/atom';
import { dailyRecordsState, monthlyRecordsState } from '@store/records/atom';
import { buildRecordList } from '@store/records/utils';
import { RecoilKeys } from '@store/types';

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
