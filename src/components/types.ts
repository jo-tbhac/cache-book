import { createElement } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface SettingList {
  label: string;
  icon: ReturnType<typeof createElement>;
}

export const SETTING_LIST: SettingList[] = [
  { label: 'カテゴリーを編集', icon: createElement(FontAwesome5, { name: 'layer-group', size: 20 }) },
  { label: '支払い方法を編集', icon: createElement(MaterialIcons, { name: 'payment', size: 20 }) },
];
