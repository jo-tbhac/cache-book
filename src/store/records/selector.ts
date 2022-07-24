import { selector } from 'recoil';
import dayjs from 'dayjs';
import { selectedDateState } from '@store/records/atom';
import { MOCK_RECORDS, IORecord, IORecordListItem } from '@store/records/types';
import { categoriesSelector } from '@store/categories/selector';
import { methodsSelector } from '@store/methods/selector';
import { RecoilKeys } from '@store/types';

export const dailyRecordsSelector = selector({
  key: RecoilKeys.dailyRecords,
  // TODO Get from Database
  get: ({ get }) => {
    const selectedDate = dayjs(get(selectedDateState)).startOf('day');
    const filteredRecords = MOCK_RECORDS.filter(
      (record) => selectedDate.isSame(dayjs(record.date).startOf('day')),
    );

    const categories = get(categoriesSelector);
    const methods = get(methodsSelector);

    const categoriesIdMap = {};
    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i];
      categoriesIdMap[category.id] = category;
    }

    const methodsIdMap = {};
    for (let i = 0; i < methods.length; i += 1) {
      const method = methods[i];
      methodsIdMap[method.id] = method;
    }

    return filteredRecords.map((record: IORecord) => {
      const recordListItem: IORecordListItem = {
        ...record,
        category: categoriesIdMap[record.categoryId]?.name || '',
        method: methodsIdMap[record.methodId]?.name || '',
      };

      return recordListItem;
    });
  },
});
