import { createElement } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CategoryScreenName, MethodScreenName } from '@navigators/pages';

export interface SettingList {
  label: string;
  icon: ReturnType<typeof createElement>;
  screen: typeof CategoryScreenName | typeof MethodScreenName;
}

export const SETTING_LIST: SettingList[] = [
  {
    label: 'カテゴリーを編集',
    icon: createElement(FontAwesome5, { name: 'layer-group', size: 20 }),
    screen: CategoryScreenName,
  },
  {
    label: '支払い方法を編集',
    icon: createElement(MaterialIcons, { name: 'payment', size: 20 }),
    screen: MethodScreenName,
  },
];
