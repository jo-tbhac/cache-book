import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { PickerTriggerProps } from './types'

export const PickerTrigger: FC<PickerTriggerProps> = ({
  onPress,
  selectedItemText,
  containerStyle
}) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={theme.styles.opacity.pressed}>
      <View style={[styles.pickerTrigger, containerStyle]}>
        <Text style={styles.selectedItemLabel}>{selectedItemText}</Text>
        <FontAwesome name="caret-down" color={theme.colors.font.sub} />
      </View>
    </TouchableOpacity>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      pickerTrigger: {
        alignItems: 'center',
        backgroundColor: theme.colors.background.main,
        borderColor: theme.colors.border.main,
        borderRadius: theme.styles.borderRadius.medium,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: theme.styles.padding.xSmall,
        paddingVertical: theme.styles.padding.small
      },
      selectedItemLabel: {
        color: theme.colors.font.main,
        flex: 1,
        fontSize: theme.styles.fontSize.medium,
        lineHeight: theme.styles.fontSize.medium * 1.4
      }
    })
  }, [theme])

  return styles
}
