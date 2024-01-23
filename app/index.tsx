import { Redirect } from 'expo-router'

import { ThemeProvider } from '@/components/providers/ThemeProvider'

export default function AppLayout() {
  return (
    <ThemeProvider>
      <Redirect href="/daily-records" />
    </ThemeProvider>
  )
}
