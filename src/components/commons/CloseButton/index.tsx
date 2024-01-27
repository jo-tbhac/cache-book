import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { useTheme } from '@/styles/hooks'

import type { CloseButtonProps } from './types'

export const CloseButton: FC<CloseButtonProps> = ({ onPress, color, size = 24 }) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesome name="xmark" color={color ?? theme.colors.font.contrast} size={size} />
    </TouchableOpacity>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        borderRadius: theme.styles.borderRadius.medium,
        paddingHorizontal: theme.styles.padding.xSmall,
        paddingVertical: theme.styles.padding.xSmall
      }
    })
  }, [theme])

  return styles
}
