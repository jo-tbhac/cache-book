import { selector } from 'recoil';
import { getCategories } from '@db/categories/query';
import { RecoilKeys } from '@store/types';

export const categoriesSelector = selector({
  key: RecoilKeys.categoriesLoader,
  get: async () => {
    const categories = await getCategories().catch((error) => {
      throw error;
    });

    return categories;
  },
});
