import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from '@components/screens/CategoryScreen';
import SettingScreen from '@components/screens/SettingScreen';
import { pages } from '@navigators/pages';

const Stack = createStackNavigator();

const SettingStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={pages.setting.name}
      component={SettingScreen}
      options={{ title: pages.setting.title }}
    />
    <Stack.Screen
      name={pages.category.name}
      component={CategoryScreen}
      options={{ title: pages.category.title }}
    />
  </Stack.Navigator>
);

export default SettingStackNavigator;
