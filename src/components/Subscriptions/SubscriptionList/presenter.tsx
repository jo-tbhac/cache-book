import { FC, useMemo } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { SubscriptionListItem } from '../SubscriptionListItem'
import { SubscriptionListPresenterProps } from './types'

export const SubscriptionListPresenter: FC<SubscriptionListPresenterProps> = ({
  subscriptions,
  setSubscriptions
}) => {
  const styles = useStyles()

  return (
    <FlatList
      data={subscriptions}
      renderItem={({ item }) => (
        <SubscriptionListItem subscription={item} setSubscriptions={setSubscriptions} />
      )}
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
        borderTopWidth: 1,
        paddingBottom: 90
      }
    })
  }, [theme])

  return styles
}
