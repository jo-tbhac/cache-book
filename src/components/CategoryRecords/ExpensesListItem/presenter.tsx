import { FC, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ListItem } from '@/components/commons/ListItem'
import { useTheme } from '@/styles/hooks'

import { ExpensesListItemPresenterProps } from './types'

export const ExpensesListItemPresenter: FC<ExpensesListItemPresenterProps> = ({
  categoryExpenses
}) => {
  const styles = useStyles()

  return (
    <ListItem containerStyle={styles.container}>
      <Text style={styles.name}>{categoryExpenses.name}</Text>
      <Text style={styles.value}>{categoryExpenses.value.toLocaleString('ja-jp')}</Text>
    </ListItem>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.main,
        borderBottomColor: theme.colors.border.main,
        borderBottomWidth: 1
      },
      name: {
        color: theme.colors.font.main,
        flex: 1,
        paddingHorizontal: theme.styles.padding.xxSmall
      },
      value: {
        color: theme.colors.font.main,
        paddingHorizontal: theme.styles.padding.xxSmall
      }
    })
  }, [theme])

  return styles
}
