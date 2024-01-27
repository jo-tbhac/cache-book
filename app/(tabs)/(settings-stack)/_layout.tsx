import { Stack } from 'expo-router/stack'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '@/styles/hooks'

export default function SettingsLayout() {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{ headerTintColor: theme.colors.font.contrast, headerStyle: styles.header }}
    >
      <Stack.Screen name="settings/index" options={{ title: '設定' }} />
      <Stack.Screen
        name="categories/index"
        options={{ presentation: 'modal', title: 'カテゴリーを編集' }}
      />
      <Stack.Screen
        name="methods/index"
        options={{ presentation: 'modal', title: '支払い方法を編集' }}
      />
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
