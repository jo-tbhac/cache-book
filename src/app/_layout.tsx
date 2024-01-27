import { PortalProvider } from '@gorhom/portal'
import { Slot } from 'expo-router'

import { Preloader } from '@/components/loader/Preloader'
import { DbProvider } from '@/components/providers/DbProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export default function AppLayout() {
  return (
    <DbProvider>
      <Preloader>
        <PortalProvider>
          <ThemeProvider>
            <Slot />
          </ThemeProvider>
        </PortalProvider>
      </Preloader>
    </DbProvider>
  )
}
