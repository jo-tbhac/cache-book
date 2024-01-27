import type { ReactNode } from 'react'
import type { TouchableOpacityProps as NativeTouchableOpacityProps } from 'react-native'

export const BUTTON_COLORS = {
  primary: 'primary',
  secondary: 'secondary'
} as const

export type ButtonColorTypes = (typeof BUTTON_COLORS)[keyof typeof BUTTON_COLORS]

export const BUTTON_SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large'
} as const

export type ButtonSizeTypes = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE]

export type ButtonProps = Omit<NativeTouchableOpacityProps, 'children'> & {
  children: ReactNode
  color?: ButtonColorTypes
  size?: ButtonSizeTypes
}
