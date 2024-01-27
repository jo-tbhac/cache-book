import { Slot } from 'expo-router'

import { DbProvider } from '@/components/providers/DbProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { useTheme } from '@/styles/hooks'

export default function AppLayout() {
  return (
    <DbProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </DbProvider>
  )
}
