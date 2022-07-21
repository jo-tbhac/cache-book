import { selector } from 'recoil';
import { MOCK_CATEGORIES } from '@store/categories/types';
import { RecoilKeys } from '@store/types';

export const categoriesSelector = selector({
  key: RecoilKeys.categories,
  // TODO Get from Database
  get: () => MOCK_CATEGORIES,
});
