import { FC, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { Header } from './Header'
import { RecordList } from './RecordList'
import { MonthlyRecordsPresenterProps } from './types'

export const MonthlyRecordsPresenter: FC<MonthlyRecordsPresenterProps> = ({ componentKey }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Header />
      <RecordList key={componentKey} />
    </View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.sub,
        flex: 1,
        width: '100%'
      }
    })
  }, [theme])

  return styles
}
