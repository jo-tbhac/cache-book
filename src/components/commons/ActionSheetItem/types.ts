import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface ActionSheetItemProps {
  label: string
  labelStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  withBorder?: boolean
}
