import { useTheme } from '@/styles/hooks'
import { useMemo } from 'react'
import type { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import type { DividerProps } from './types'

export const Divider: FC<DividerProps> = ({ orientation = 'horizontal' }) => {
  const styles = useStyles()

  return <View style={orientation === 'horizontal' ? styles.horizontal : styles.vertical} />
}

const useStyles = (): typeof styles => {
  const { colors } = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      horizontal: {
        backgroundColor: colors.border.main,
        height: 1,
        width: '100%'
      },
      vertical: {
        backgroundColor: colors.border.main,
        height: '100%',
        width: 1
      }
    })
  }, [colors])

  return styles
}
