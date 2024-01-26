import { FC, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { RecordListPresenterProps } from './types'

export const RecordListPresenter: FC<RecordListPresenterProps> = ({ dailyRecords }) => {
  const styles = useStyles()

  return <FlatList data={dailyRecords} renderItem={() => <View />} style={styles.container} />
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.main,
        width: '100%'
      }
    })
  }, [theme])

  return styles
}
