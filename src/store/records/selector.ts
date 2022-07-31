import { selector } from 'recoil';
import dayjs from 'dayjs';
import { getRecordsBy } from '@db/records/query';
import { selectedDateState } from '@store/date/atom';
import { IORecord, IORecordListItem } from '@store/records/types';
import { categoriesState } from '@store/categories/atom';
import { methodsState } from '@store/methods/atom';
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

    return records.map((record: IORecord) => {
      const recordListItem: IORecordListItem = {
        ...record,
        category: categoriesIdMap[record.categoryId]?.name || '',
        method: methodsIdMap[record.methodId]?.name || '',
      };

      return recordListItem;
    });
  },
});
