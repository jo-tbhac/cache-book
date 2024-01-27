import { Portal } from '@gorhom/portal'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions
} from 'react-native'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/styles/hooks'

import type { ActionSheetProps } from './types'

export const ActionSheet: FC<ActionSheetProps> = ({ children, show, onBackDropPress, onClose }) => {
  const styles = useStyles()

  const [actionSheetVisible, setActionSheetVisible] = useState(show)

  // ScrollView内のContentsの高さ
  const [contentsHeight, setContentsHeight] = useState(0)

  const windowHeight = useWindowDimensions().height
  const windowWidth = useWindowDimensions().width
  const insets = useSafeAreaInsets()

  const bottomOffset = useMemo(() => {
    if (Platform.OS === 'android') {
      return 0
    }

    return insets.bottom + 10
  }, [insets.bottom])

  const contentsTransformY = useRef(new Animated.Value(windowHeight + insets.top + bottomOffset))
  const overlayOpacity = useRef(new Animated.Value(0))

  // キーボードが表示されているかどうか
  // 確実に最新の状態を取得したいのでStateではなくRefで保持する
  const keyboardVisible = useRef(false)

  const onKeyboardShow = useCallback(() => {
    keyboardVisible.current = true
  }, [])

  const onKeyboardHide = useCallback(() => {
    keyboardVisible.current = false
  }, [])

  useEffect(() => {
    const keyboardEventListeners = [
      Keyboard.addListener('keyboardDidShow', onKeyboardShow),
      Keyboard.addListener('keyboardDidHide', onKeyboardHide)
    ]

    return () => {
      for (const eventListener of keyboardEventListeners) {
        eventListener.remove()
      }
    }
  }, [onKeyboardHide, onKeyboardShow])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (show) {
      Keyboard.dismiss()
      setActionSheetVisible(show)

      return
    }

    // アクションシートを閉じるアニメーションを開始
    Animated.parallel([
      Animated.timing(overlayOpacity.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(contentsTransformY.current, {
        toValue: windowHeight + insets.top + bottomOffset,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      setActionSheetVisible(show)
      if (onClose != null) {
        onClose()
      }
    })
  }, [show])

  useEffect(() => {
    if (!actionSheetVisible) {
      return
    }

    // アクションシートを表示するアニメーションを開始
    Animated.parallel([
      Animated.timing(overlayOpacity.current, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(contentsTransformY.current, {
        toValue: 0,
        duration: 200,
        // キーボードが表示されている場合は表示タイミングを少し遅らせる
        delay: keyboardVisible.current ? 80 : 0,
        useNativeDriver: true
      })
    ]).start()
  }, [actionSheetVisible])

  const onLayoutContents = (event: LayoutChangeEvent): void => {
    setContentsHeight(event.nativeEvent.layout.height)
  }

  // ActionSheetのリストがWindowサイズをオーバーしない場合はWindowの下端に合わせて表示する
  // オーバーする場合はposition: 'absolute'があるとスクロールがうまく効いてくれないのでpaddingBottomだけ当てる
  const contentStyle: Animated.WithAnimatedObject<ViewStyle> =
    contentsHeight + insets.top + 10 + bottomOffset > windowHeight
      ? { paddingBottom: bottomOffset }
      : { position: 'absolute', bottom: bottomOffset }

  if (!actionSheetVisible) {
    return null
  }

  return (
    <Portal>
      <TouchableWithoutFeedback onPress={onBackDropPress}>
        <Animated.View
          style={[
            Platform.select({ ios: styles.ios.overlay, android: styles.android.overlay }),
            { paddingTop: insets.top, opacity: overlayOpacity.current }
          ]}
        >
          <Animated.ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={[
              Platform.select({
                ios: styles.ios.scrollContainer,
                android: styles.android.scrollContainer
              }),
              { transform: [{ translateY: contentsTransformY.current }] }
            ]}
            contentContainerStyle={[
              Platform.select({
                ios: styles.ios.contentsContainer,
                android: styles.android.contentsContainer
              }),
              contentStyle,
              { width: windowWidth }
            ]}
          >
            <View
              // 子要素へのタッチイベントの伝播を止める
              onStartShouldSetResponder={() => true}
              onLayout={onLayoutContents}
            >
              {children}
            </View>
          </Animated.ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Portal>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(
    () => ({
      ios: StyleSheet.create({
        scrollContainer: {
          width: '100%'
        },
        contentsContainer: {
          alignSelf: 'center',
          maxWidth: 800,
          paddingHorizontal: theme.styles.padding.small,
          paddingTop: theme.styles.padding.small
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.6)',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: 'flex-end'
        }
      }),
      android: StyleSheet.create({
        scrollContainer: {
          width: '100%'
        },
        contentsContainer: {
          alignSelf: 'center',
          maxWidth: 800,
          paddingTop: theme.styles.padding.small
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.6)',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: 'flex-end'
        }
      })
    }),
    [theme]
  )

  return styles
}
