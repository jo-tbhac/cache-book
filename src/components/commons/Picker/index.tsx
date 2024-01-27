import { Picker as NativePicker } from '@react-native-picker/picker'
import { FC, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { useTheme } from '@/styles/hooks'

import { PickerProps } from './types'

export const Picker: FC<PickerProps> = ({ items, expanded, selectedValue, handleChangeValue }) => {
  const styles = useStyles()

  const [height, setHeight] = useState(0)
  const animatedHeight = useSharedValue(0)

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight)
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0)

    return {
      height: animatedHeight.value
    }
  }, [expanded, height])

  return (
    <Animated.View style={[animatedStyle, styles.animatedContainer]}>
      <View style={styles.container} onLayout={onLayout}>
        <NativePicker
          selectedValue={selectedValue}
          onValueChange={(value) => handleChangeValue(Number(value))}
          itemStyle={styles.pickerItem}
        >
          {items.map((item) => (
            <NativePicker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </NativePicker>
      </View>
    </Animated.View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      animatedContainer: {
        overflow: 'hidden'
      },
      container: {
        height: 180
      },
      pickerItem: {
        color: theme.colors.font.main,
        fontSize: theme.styles.fontSize.small
      }
    })
  }, [theme])

  return styles
}
