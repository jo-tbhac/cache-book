import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { pages } from '@navigators/pages';
import RecordScreen from '@components/screens/RecordScreen';
import IndexScreen from '@components/screens/IndexScreen';
import CategoryScreen from '@components/screens/CategoryScreen';
import { colors } from '@styles/color';

type TabIconProps = {
  color: string;
  size: number;
}

const Tab = createBottomTabNavigator();

const RecordTabIcon = ({ color, size }: TabIconProps) => (
  <FontAwesome5 name="pen" size={size} color={color} />
);

const IndexTabIcon = ({ color, size }: TabIconProps) => (
  <FontAwesome5 name="list" size={size} color={color} />
);

const CategoryTabIcon = ({ color, size }: TabIconProps) => (
  <FontAwesome5 name="layer-group" size={size} color={color} />
);

const ButtomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.bottomTab.fill,
      tabBarInactiveTintColor: colors.inactiveTabIcon.fill,
      tabBarLabelStyle: styles.tabBarLabel,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name={pages.record.name}
      component={RecordScreen}
      options={{ title: pages.record.title, tabBarIcon: RecordTabIcon }}
    />
    <Tab.Screen
      name={pages.index.name}
      component={IndexScreen}
      options={{ title: pages.index.title, tabBarIcon: IndexTabIcon }}
    />
    <Tab.Screen
      name={pages.category.name}
      component={CategoryScreen}
      options={{ title: pages.category.title, tabBarIcon: CategoryTabIcon }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 11,
  },
});

export default ButtomTabNavigator;
