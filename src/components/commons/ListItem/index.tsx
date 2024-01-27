import { useTheme } from '@/styles/hooks'
import { forwardRef, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import type { ListItemProps } from './types'

export const ListItem = forwardRef<TouchableOpacity, ListItemProps>(
  ({ children, onPress, onLongPress, containerStyle }, ref) => {
    const styles = useStyles()
    const theme = useTheme()

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={onPress == null && onLongPress == null}
        activeOpacity={theme.styles.opacity.pressed}
        style={containerStyle}
      >
        <View style={styles.container}>{children}</View>
      </TouchableOpacity>
    )
  }
)

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        alignItems: 'center',
        backgroundColor: theme.colors.background.main,
        flexDirection: 'row',
        minHeight: 48,
        paddingHorizontal: theme.styles.padding.small,
        paddingVertical: theme.styles.padding.xSmall
      }
    })
  }, [theme])

  return styles
}
