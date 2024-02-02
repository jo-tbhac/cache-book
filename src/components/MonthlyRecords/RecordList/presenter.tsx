import dayjs from 'dayjs'
import { FC, useMemo } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { RecordListItem } from '../RecordListItem'
import { RecordListPresenterProps } from './types'

export const RecordListPresenter: FC<RecordListPresenterProps> = ({
  monthlyRecords,
  currentMonthTotal,
  lastMonthTotal,
  totalExpenses
}) => {
  const styles = useStyles()
  const theme = useTheme()

  const diff = lastMonthTotal - currentMonthTotal

  return (
    <>
      <FlatList
        data={monthlyRecords}
        renderItem={({ item, index }) => {
          const dateString = dayjs(item.date).format('MM/DD')
          const previousRecord = monthlyRecords[index - 1]
          const previousDateString = previousRecord
            ? dayjs(previousRecord.date).format('MM/DD')
            : ''

          return (
            <RecordListItem
              record={item}
              totalExpenses={totalExpenses(index, item.methodId)}
              dateString={dateString}
              previousDateString={previousDateString}
            />
          )
        }}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />

      <View style={styles.expensesContainer}>
        <Text style={styles.expensesLabel}>支出合計</Text>
        <Text style={styles.expensesValue}>{currentMonthTotal.toLocaleString('ja-jp')}</Text>
      </View>
      <View style={styles.expensesContainer}>
        <Text style={styles.expensesLabel}>前月比</Text>
        <Text
          style={[
            styles.expensesValue,
            { color: diff < 0 ? theme.colors.font.error : theme.colors.font.main }
          ]}
        >
          {diff.toLocaleString('ja-jp')}
        </Text>
      </View>
    </>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.sub,
        borderBottomColor: theme.colors.border.main,
        borderBottomWidth: 1,
        width: '100%'
      },
      contentContainer: {
        borderTopColor: theme.colors.border.main,
        borderTopWidth: 1
      },
      expensesContainer: {
        backgroundColor: theme.colors.background.main,
        flexDirection: 'row',
        paddingHorizontal: theme.styles.padding.medium,
        paddingVertical: theme.styles.padding.xSmall
      },
      expensesLabel: {
        flex: 1,
        color: theme.colors.font.main,
        paddingRight: theme.styles.padding.xSmall
      },
      expensesValue: {
        color: theme.colors.font.main,
        fontWeight: theme.styles.fontWeight.bold
      }
    })
  }, [theme])

  return styles
}
