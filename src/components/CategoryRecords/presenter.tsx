import { FC, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { ExpensesListItem } from './ExpensesListItem'
import { Header } from './Header'
import { CategoryRecordsPresenterProps } from './types'

export const CategoryRecordsPresenter: FC<CategoryRecordsPresenterProps> = ({
  categoryExpenses
}) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={categoryExpenses}
        renderItem={({ item }) => <ExpensesListItem categoryExpenses={item} />}
      />
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
