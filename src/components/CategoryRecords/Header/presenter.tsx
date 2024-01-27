import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/styles/hooks'

import { HeaderPresenterProps } from './types'

export const HeaderPresenter: FC<HeaderPresenterProps> = ({
  selectedMonth,
  increaseMonth,
  decreaseMonth
}) => {
  const styles = useStyles()
  const theme = useTheme()

  const insets = useSafeAreaInsets()

  const dateString = useMemo(() => selectedMonth.format('YYYY/MM'), [selectedMonth])

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.styles.padding.xSmall }]}>
      <TouchableOpacity style={styles.angleButton} onPress={decreaseMonth}>
        <FontAwesome name="angle-left" size={20} color={theme.colors.font.contrast} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {dateString}
        の記録
      </Text>
      <TouchableOpacity style={styles.angleButton} onPress={increaseMonth}>
        <FontAwesome name="angle-right" size={20} color={theme.colors.font.contrast} />
      </TouchableOpacity>
    </View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        alignItems: 'center',
        backgroundColor: theme.colors.app.primary.main,
        flexDirection: 'row',
        paddingBottom: theme.styles.padding.small,
        paddingHorizontal: theme.styles.padding.medium,
        width: '100%'
      },
      angleButton: {
        paddingHorizontal: theme.styles.padding.medium,
        paddingVertical: theme.styles.padding.xxSmall
      },
      title: {
        color: theme.colors.font.contrast,
        flex: 1,
        fontSize: theme.styles.fontSize.large,
        fontWeight: theme.styles.fontWeight.bold,
        textAlign: 'center'
      }
    })
  }, [theme])

  return styles
}
