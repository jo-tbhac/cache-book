import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { FloatButton } from '@/components/commons/FloatButton'
import { useTheme } from '@/styles/hooks'

import { SubscriptionList } from './SubscriptionList'
import { SubscriptionsPresenterProps } from './types'

export const SubscriptionsPresenter: FC<SubscriptionsPresenterProps> = ({
  navigateFormPage,
  componentKey
}) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <SubscriptionList key={componentKey} />
      <FloatButton onPress={navigateFormPage}>
        <FontAwesome name="plus" color={theme.colors.font.contrast} size={32} />
      </FloatButton>
    </View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.main,
        flex: 1,
        width: '100%'
      }
    })
  }, [theme])

  return styles
}
