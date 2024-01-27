import { FC, useMemo } from 'react'
import { Platform, StyleSheet, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import type { ActionSheetCancelItemWrapperProps, ActionSheetItemWrapperProps } from './types'

export const ActionSheetItemWrapper: FC<ActionSheetItemWrapperProps> = ({ style, ...props }) => {
  const styles = useItemWrapperStyles()

  return (
    <View
      style={[
        Platform.select<typeof styles.ios.container | typeof styles.android.container>({
          ios: styles.ios.container,
          android: styles.android.container
        }),
        style
      ]}
      {...props}
    />
  )
}

const useItemWrapperStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return {
      ios: StyleSheet.create({
        container: {
          backgroundColor: theme.colors.background.main,
          borderRadius: theme.styles.borderRadius.medium,
          overflow: 'hidden'
        }
      }),
      android: StyleSheet.create({
        container: {
          backgroundColor: theme.colors.background.main,
          overflow: 'hidden',
          borderTopRightRadius: theme.styles.borderRadius.medium,
          borderTopLeftRadius: theme.styles.borderRadius.medium
        }
      })
    }
  }, [theme])

  return styles
}

export const ActionSheetCancelItemWrapper: FC<ActionSheetCancelItemWrapperProps> = ({
  style,
  ...props
}) => {
  const styles = useCancelItemWrapperStyles()

  return (
    <View
      style={[
        Platform.select<typeof styles.ios.container | typeof styles.android.container>({
          ios: styles.ios.container,
          android: styles.android.container
        }),
        style
      ]}
      {...props}
    />
  )
}

const useCancelItemWrapperStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return {
      ios: StyleSheet.create({
        container: {
          backgroundColor: theme.colors.background.main,
          borderRadius: theme.styles.borderRadius.medium,
          marginTop: theme.styles.margin.small,
          overflow: 'hidden'
        }
      }),
      android: StyleSheet.create({
        container: {
          backgroundColor: theme.colors.background.main,
          overflow: 'hidden'
        }
      })
    }
  }, [theme])

  return styles
}
