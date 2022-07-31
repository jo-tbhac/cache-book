import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';
import { categoriesSelector } from '@store/categories/selector';

export const categoriesState = atom({
  key: RecoilKeys.categories,
  default: categoriesSelector,
});
