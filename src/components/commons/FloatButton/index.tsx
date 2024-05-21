import { useTheme } from '@/styles/hooks'
import { forwardRef, useMemo } from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import type { FloatButtonProps } from './types'

export const FloatButton = forwardRef<TouchableHighlight, FloatButtonProps>(
  ({ onPress, onLongPress, children, position = { bottom: 10, right: 10 } }, ref) => {
    const styles = useStyles()

    const { colors } = useTheme()

    return (
      <TouchableHighlight
        ref={ref}
        style={[styles.touchableContainer, position]}
        onPress={onPress}
        onLongPress={onLongPress}
        underlayColor={colors.background.main}
      >
        <View style={styles.container}>{children}</View>
      </TouchableHighlight>
    )
  }
)

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      touchableContainer: {
        borderRadius: 35,
        height: 70,
        position: 'absolute',
        width: 70
      },
      container: {
        ...theme.styles.boxShadow.normal,
        alignItems: 'center',
        backgroundColor: theme.colors.app.primary.main,
        borderRadius: 35,
        height: 70,
        justifyContent: 'center',
        width: 70
      }
    })
  }, [theme])

  return styles
}
