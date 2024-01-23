import { Tabs } from 'expo-router/tabs'

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="daily-records/index" />
      <Tabs.Screen name="monthly-records/index" />
      <Tabs.Screen name="category-records/index" />
    </Tabs>
  )
}
