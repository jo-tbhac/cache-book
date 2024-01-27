import { FC, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ListItem } from '@/components/commons/ListItem'
import { useTheme } from '@/styles/hooks'

import { RecordListItemPresenterProps } from './types'

export const RecordListItemPresenter: FC<RecordListItemPresenterProps> = ({
  record,
  category,
  method,
  totalExpenses
}) => {
  const styles = useStyles()

  return (
    <ListItem containerStyle={styles.container}>
      <View style={styles.name}>
        <Text style={styles.nameText}>{record.name}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.valueText}>{record.value.toLocaleString('ja-jp')}</Text>
      </View>
      <View style={styles.method}>
        <Text style={styles.methodText}>{method?.name}</Text>
      </View>
      <View style={styles.totalExpenses}>
        <Text style={styles.totalExpensesText}>{totalExpenses.toLocaleString('ja-jp')}</Text>
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryText}>{category?.name}</Text>
      </View>
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
        flex: 2,
        paddingHorizontal: theme.styles.padding.xxSmall
      },
      nameText: {
        color: theme.colors.font.main,
        fontSize: theme.styles.fontSize.small
      },
      value: {
        flex: 1,
        paddingHorizontal: theme.styles.padding.xxSmall
      },
      valueText: {
        color: theme.colors.font.error,
        fontSize: theme.styles.fontSize.small,
        textAlign: 'right'
      },
      method: {
        flex: 1,
        paddingHorizontal: theme.styles.padding.xxSmall
      },
      methodText: {
        color: theme.colors.font.main,
        fontSize: theme.styles.fontSize.small
      },
      totalExpenses: {
        paddingHorizontal: theme.styles.padding.xxSmall,
        width: 80
      },
      totalExpensesText: {
        color: theme.colors.font.error,
        fontSize: theme.styles.fontSize.small,
        textAlign: 'right'
      },
      category: {
        paddingHorizontal: theme.styles.padding.xxSmall,
        width: 80
      },
      categoryText: {
        color: theme.colors.font.main,
        fontSize: theme.styles.fontSize.small
      },
      deleteButtonLabel: {
        color: theme.colors.font.error
      }
    })
  }, [theme])

  return styles
}
