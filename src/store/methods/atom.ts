import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';
import { methodsLoader } from '@store/methods/loader';

export const methodsState = atom({
  key: RecoilKeys.methods,
  default: methodsLoader,
});
