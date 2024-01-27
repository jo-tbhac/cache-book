import type { ReactNode } from 'react'
import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native'

export type ListItemProps = Pick<TouchableOpacityProps, 'onPress' | 'onLongPress'> & {
  children: ReactNode
  disableGutters?: boolean
  containerStyle?: StyleProp<ViewStyle>
}
