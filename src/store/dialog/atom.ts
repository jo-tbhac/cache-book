import { atom } from 'recoil';
import { RecoilKeys } from '@store/types';
import { DialogOptions } from '@store/dialog/types';

export const dialogState = atom<DialogOptions>({
  key: RecoilKeys.dialog,
  default: {
    visible: false,
    title: '',
  },
});
