import { FC, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { MonthlyRecordsPresenterProps } from './types'

export const MonthlyRecordsPresenter: FC<MonthlyRecordsPresenterProps> = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text>MonthlyRecords</Text>
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
