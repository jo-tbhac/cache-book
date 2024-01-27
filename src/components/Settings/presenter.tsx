import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { ListItem } from '@/components/commons/ListItem'
import { useTheme } from '@/styles/hooks'

import { colors } from '@/styles/theme'
import { SettingsPresenterProps } from './types'

export const SettingsPresenter: FC<SettingsPresenterProps> = ({
  navigateCategoriesPage,
  navigateMethodsPage
}) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ListItem containerStyle={styles.listItem} onPress={navigateCategoriesPage}>
        <Text style={styles.text}>カテゴリーを編集</Text>
        <FontAwesome name="angle-right" color={colors.font.sub} />
      </ListItem>
      <ListItem containerStyle={styles.listItem} onPress={navigateMethodsPage}>
        <Text style={styles.text}>支払い方法を編集</Text>
        <FontAwesome name="angle-right" color={colors.font.sub} />
      </ListItem>
    </ScrollView>
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
        borderTopColor: colors.border.main,
        borderTopWidth: 1
      },
      listItem: {
        borderBottomColor: colors.border.main,
        borderBottomWidth: 1
      },
      text: {
        color: theme.colors.font.main,
        flex: 1
      }
    })
  }, [theme])

  return styles
}
