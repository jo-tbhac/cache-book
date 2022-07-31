import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from '@components/screens/CategoryScreen';
import MethodScreen from '@components/screens/MethodScreen';
import SettingScreen from '@components/screens/SettingScreen';
import { pages } from '@navigators/pages';
import { colors } from '@styles/color';

const Stack = createStackNavigator();

const SettingStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerBackTitleVisible: false, headerTintColor: colors.header.fill }}
  >
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
    <Stack.Screen
      name={pages.method.name}
      component={MethodScreen}
      options={{ title: pages.method.title }}
    />
  </Stack.Navigator>
);

export default SettingStackNavigator;
