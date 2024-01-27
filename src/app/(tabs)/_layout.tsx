import { Tabs } from 'expo-router/tabs'

import { TabBarIcon } from '@/components/commons/TabBarIcon'
import { useTheme } from '@/styles/hooks'

export default function AppLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.app.primary.main,
        tabBarInactiveTintColor: theme.colors.font.placeholder,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="(daily-records-stack)"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="pen" color={color} />,
          tabBarLabel: '入力'
        }}
      />
      <Tabs.Screen
        name="monthly-records/index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          tabBarLabel: '月別',
          unmountOnBlur: true
        }}
      />
      <Tabs.Screen
        name="category-records/index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="layer-group" color={color} />,
          tabBarLabel: 'カテゴリー別',
          unmountOnBlur: true
        }}
      />
      <Tabs.Screen
        name="(settings-stack)"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          tabBarLabel: '設定'
        }}
      />
    </Tabs>
  )
}
