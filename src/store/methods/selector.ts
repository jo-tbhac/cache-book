import { selector } from 'recoil';
import { MOCK_PAYMENT_METHODS } from '@store/methods/types';
import { RecoilKeys } from '@store/types';

export const methodsSelector = selector({
  key: RecoilKeys.methods,
  // TODO Get from Database
  get: () => MOCK_PAYMENT_METHODS,
});
