import { FC, useMemo } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { MethodListItem } from './MethodListItem'
import { MethodsPresenterProps } from './types'

export const MethodsPresenter: FC<MethodsPresenterProps> = ({ methods }) => {
  const styles = useStyles()

  return (
    <FlatList
      data={methods}
      renderItem={({ item }) => <MethodListItem method={item} />}
      style={styles.container}
      ListFooterComponent={<MethodListItem />}
    />
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.sub,
        borderTopColor: theme.colors.border.main,
        borderTopWidth: 1,
        width: '100%'
      }
    })
  }, [theme])

  return styles
}
