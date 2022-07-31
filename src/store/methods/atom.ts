import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';
import { methodsSelector } from '@store/methods/selector';

export const methodsState = atom({
  key: RecoilKeys.methods,
  default: methodsSelector,
});
