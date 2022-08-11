import { selector } from 'recoil';
import { getMethods } from '@db/methods/query';
import { RecoilKeys } from '@store/types';

export const methodsLoader = selector({
  key: RecoilKeys.methodsLoader,
  get: async () => {
    const methods = await getMethods().catch((error) => {
      throw error;
    });

    return methods;
  },
});
