import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { FC, useMemo } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { HeaderPresenterProps } from './types'

export const HeaderPresenter: FC<HeaderPresenterProps> = ({
  selectedDate,
  increaseDate,
  decreaseDate
}) => {
  const styles = useStyles()
  const theme = useTheme()

  const dateString = useMemo(() => selectedDate.format('YYYY/MM/DD'), [selectedDate])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.angleButton} onPress={decreaseDate}>
        <FontAwesome name="angle-left" size={20} color={theme.colors.font.sub} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {dateString}
        の記録
      </Text>
      <TouchableOpacity style={styles.angleButton} onPress={increaseDate}>
        <FontAwesome name="angle-right" size={20} color={theme.colors.font.sub} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: theme.styles.margin.xLarge,
        paddingHorizontal: theme.styles.padding.medium,
        paddingVertical: theme.styles.padding.small,
        width: '100%'
      },
      angleButton: {
        paddingHorizontal: theme.styles.padding.medium,
        paddingVertical: theme.styles.padding.xSmall
      },
      title: {
        color: theme.colors.font.main,
        flex: 1,
        fontSize: theme.styles.fontSize.xLarge,
        fontWeight: theme.styles.fontWeight.bold,
        textAlign: 'center'
      }
    })
  }, [theme])

  return styles
}
