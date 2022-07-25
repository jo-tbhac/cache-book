import { selector } from 'recoil';
import { getMethods } from '@db/methods/query';
import { RecoilKeys } from '@store/types';

export const methodsSelector = selector({
  key: RecoilKeys.methods,
  get: async () => {
    const methods = await getMethods().catch((error) => {
      throw error;
    });

    return methods;
  },
});
