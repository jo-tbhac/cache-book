import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';
import { categoriesLoader } from '@store/categories/loader';

export const categoriesState = atom({
  key: RecoilKeys.categories,
  default: categoriesLoader,
});
