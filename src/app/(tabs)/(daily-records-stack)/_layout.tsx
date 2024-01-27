import { Stack } from 'expo-router/stack'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '@/styles/hooks'

export default function SettingsLayout() {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.font.contrast,
        headerStyle: styles.header,
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name="daily-records/index" options={{ headerShown: false }} />
      <Stack.Screen name="form/index" options={{ presentation: 'modal', title: '支出の記録' }} />
    </Stack>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      header: {
        backgroundColor: theme.colors.app.primary.main
      }
    })
  }, [theme])

  return styles
}
