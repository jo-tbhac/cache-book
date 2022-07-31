import type { StackNavigationProp } from '@react-navigation/stack';
import { CategoryScreenName, MethodScreenName } from '@navigators/pages';

type SettingStackParamList = {
  category: undefined;
  method: undefined;
}

export type SettingScreenNavigationProp = StackNavigationProp<
  SettingStackParamList,
  typeof CategoryScreenName | typeof MethodScreenName
>;
