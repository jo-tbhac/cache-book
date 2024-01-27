import type { StyleProp, ViewStyle } from 'react-native'

export interface PickerTriggerProps {
  selectedItemText: string
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
}
