import { createElement } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CategoryScreenName, MethodScreenName } from '@navigators/pages';
import { LIST_ICON_SIZE } from '@styles/index';

export interface SettingList {
  label: string;
  icon: ReturnType<typeof createElement>;
  screen: typeof CategoryScreenName | typeof MethodScreenName;
}

export const SETTING_LIST: SettingList[] = [
  {
    label: 'カテゴリーを編集',
    icon: createElement(FontAwesome5, { name: 'layer-group', size: LIST_ICON_SIZE }),
    screen: CategoryScreenName,
  },
  {
    label: '支払い方法を編集',
    icon: createElement(MaterialIcons, { name: 'payment', size: LIST_ICON_SIZE }),
    screen: MethodScreenName,
  },
];
