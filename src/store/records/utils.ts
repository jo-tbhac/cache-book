import { Category } from '@store/categories/types';
import { PaymentMethod } from '@store/methods/types';
import { IORecord, IORecordListItem } from '@store/records/types';

export const buildRecordList = ({
  categories,
  methods,
  records,
}: {
  categories: Category[];
  methods: PaymentMethod[];
  records: IORecord[];
}) => {
  const categoriesIdMap: { [id: number]: Category } = {};
  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];
    categoriesIdMap[category.id] = category;
  }

  const methodsIdMap: { [id: number]: PaymentMethod } = {};
  for (let i = 0; i < methods.length; i += 1) {
    const method = methods[i];
    methodsIdMap[method.id] = method;
  }

  return records.map((record: IORecord) => {
    const categoryName = record.categoryId ? categoriesIdMap[record.categoryId].name : '';
    const recordListItem: IORecordListItem = {
      ...record,
      category: categoryName,
      method: methodsIdMap[record.methodId]?.name || '',
    };

    return recordListItem;
  });
};
