import { Redirect } from 'expo-router'

import { DbProvider } from '@/components/providers/DbProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export default function App() {
  return (
    <DbProvider>
      <ThemeProvider>
        <Redirect href="/daily-records" />
      </ThemeProvider>
    </DbProvider>
  )
}
