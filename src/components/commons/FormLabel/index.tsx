import { useTheme } from '@/styles/hooks'
import { useMemo } from 'react'
import type { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { FormLabelProps } from './types'

export const FormLabel: FC<FormLabelProps> = ({ children }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        marginLeft: theme.styles.margin.xxSmall
      },
      text: {
        color: theme.colors.font.sub,
        fontSize: theme.styles.fontSize.small,
        fontWeight: theme.styles.fontWeight.bold
      }
    })
  }, [theme])

  return styles
}
