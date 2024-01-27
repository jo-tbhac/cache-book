import { FC, useMemo } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { CategoryListItem } from './CategoryListItem'
import { CategoriesPresenterProps } from './types'

export const CategoriesPresenter: FC<CategoriesPresenterProps> = ({ categories }) => {
  const styles = useStyles()

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <CategoryListItem category={item} />}
      style={styles.container}
      ListFooterComponent={<CategoryListItem />}
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
