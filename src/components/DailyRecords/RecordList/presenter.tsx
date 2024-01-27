import { FC, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { RecordListItem } from '../RecordListItem'
import { RecordListPresenterProps } from './types'

export const RecordListPresenter: FC<RecordListPresenterProps> = ({ dailyRecords }) => {
  const styles = useStyles()

  return (
    <FlatList
      data={dailyRecords}
      renderItem={({ item }) => <RecordListItem record={item} />}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.sub,
        width: '100%'
      },
      contentContainer: {
        borderTopColor: theme.colors.border.main,
        borderTopWidth: 1
      }
    })
  }, [theme])

  return styles
}
