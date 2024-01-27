import type { ReactNode } from 'react'
import type { TouchableOpacityProps, ViewStyle, StyleProp } from 'react-native'

export type ListItemProps = Pick<TouchableOpacityProps, 'onPress' | 'testID'> & {
  children: ReactNode
  disableGutters?: boolean
  containerStyle?: StyleProp<ViewStyle>
}
