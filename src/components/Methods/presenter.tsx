import { FC, useMemo } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { MethodsPresenterProps } from './types'

export const MethodsPresenter: FC<MethodsPresenterProps> = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text>Methods</Text>
    </View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.main,
        flex: 1,
        width: '100%'
      }
    })
  }, [theme])

  return styles
}
