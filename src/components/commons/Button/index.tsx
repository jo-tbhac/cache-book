import { forwardRef, useMemo } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { useTheme } from '@/styles/hooks'

import { ButtonProps } from './types'

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ children, color = 'primary', size = 'large', ...props }, ref) => {
    const styles = useStyles()
    const theme = useTheme()

    const containerStyles = useMemo((): StyleProp<ViewStyle> => {
      const styleProps: StyleProp<ViewStyle> = [styles.buttonBase]

      switch (color) {
        case 'primary':
          styleProps.push(styles.buttonPrimary)
          break
        case 'secondary':
          styleProps.push(styles.buttonSecondary)
          break
      }

      switch (size) {
        case 'large':
          styleProps.push(styles.buttonLarge)
          break
        case 'medium':
          styleProps.push(styles.buttonMedium)
          break
        case 'small':
          styleProps.push(styles.buttonSmall)
          break
      }

      return styleProps
    }, [color, size, styles])

    const textStyles = useMemo(() => {
      const styleProps: StyleProp<TextStyle> = [styles.textBase]

      switch (color) {
        case 'primary':
          styleProps.push(styles.textPrimary)
          break
        case 'secondary':
          styleProps.push(styles.textSecondary)
          break
      }

      switch (size) {
        case 'large':
          styleProps.push(styles.textLarge)
          break
        case 'medium':
        case 'small':
          styleProps.push(styles.textSmall)
          break
      }

      return styleProps
    }, [color, size, styles])

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={theme.styles.opacity.pressed}
        accessibilityRole="button"
        {...props}
      >
        <View style={containerStyles}>
          <Text style={textStyles}>{children}</Text>
        </View>
      </TouchableOpacity>
    )
  }
)

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      buttonBase: {
        borderRadius: theme.styles.borderRadius.medium,
        overflow: 'hidden',
        position: 'relative'
      },
      buttonPrimary: {
        backgroundColor: theme.colors.button.primary,
        borderColor: theme.colors.button.primary,
        borderWidth: 1
      },
      buttonSecondary: {
        backgroundColor: theme.colors.button.secondary,
        borderColor: theme.colors.border.main,
        borderWidth: 1
      },
      buttonSmall: {
        justifyContent: 'center',
        minHeight: 40,
        minWidth: 60,
        paddingHorizontal: theme.styles.padding.xSmall,
        paddingVertical: theme.styles.padding.xxSmall
      },
      buttonMedium: {
        justifyContent: 'center',
        minHeight: 40,
        minWidth: 120,
        paddingHorizontal: theme.styles.padding.xSmall,
        paddingVertical: theme.styles.padding.xxSmall
      },
      buttonLarge: {
        justifyContent: 'center',
        minHeight: 45,
        minWidth: 180,
        paddingHorizontal: theme.styles.padding.small,
        paddingVertical: theme.styles.padding.xxSmall
      },
      textBase: {
        alignSelf: 'center',
        fontWeight: theme.styles.fontWeight.bold
      },
      textPrimary: {
        color: theme.colors.font.contrast
      },
      textSecondary: {
        color: theme.colors.font.main
      },
      textLarge: {
        fontSize: theme.styles.fontSize.medium
      },
      textSmall: {
        fontSize: theme.styles.fontSize.small
      }
    })
  }, [theme])

  return styles
}
