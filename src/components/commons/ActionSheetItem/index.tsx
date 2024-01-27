import { FC, useMemo } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import type { ActionSheetItemProps } from './types'

export const ActionSheetItem: FC<ActionSheetItemProps> = ({
  label,
  labelStyle,
  containerStyle,
  onPress,
  withBorder = Platform.select({ ios: true, android: false })
}) => {
  const styles = useStyles()

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          Platform.select<typeof styles.ios.container | typeof styles.android.container>({
            ios: styles.ios.container,
            android: styles.android.container
          }),
          containerStyle,
          withBorder === true &&
            Platform.select({ ios: styles.ios.border, android: styles.android.border })
        ]}
      >
        <Text
          style={[
            Platform.select<typeof styles.ios.label | typeof styles.android.label>({
              ios: styles.ios.label,
              android: styles.android.label
            }),
            labelStyle
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(
    () => ({
      ios: StyleSheet.create({
        container: {
          padding: theme.styles.padding.medium,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: theme.colors.background.main,
          justifyContent: 'center'
        },
        label: {
          color: theme.colors.app.primary.main
        },
        border: {
          borderBottomColor: theme.colors.border.main,
          borderBottomWidth: 1
        }
      }),
      android: StyleSheet.create({
        container: {
          padding: theme.styles.padding.medium,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: theme.colors.background.main,
          justifyContent: 'flex-start'
        },
        label: {
          color: theme.colors.font.main
        },
        border: {
          borderBottomColor: theme.colors.border.main,
          borderBottomWidth: 1
        }
      })
    }),
    [theme]
  )

  return styles
}
