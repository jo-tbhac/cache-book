import React, {
  useEffect, useRef, useCallback, useState,
} from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Animated, Keyboard, LayoutChangeEvent,
} from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { Portal } from '@gorhom/portal';
import { colors } from '@styles/color';

export const PickerItem = Picker.Item;

interface PickerComponentProps<T> extends PickerProps<T> {
  show: boolean;
  onDonePress?: () => void;
}

const PickerComponent = <T extends unknown>({
  show,
  onDonePress,
  ...props
}: PickerComponentProps<T>) => {
  const [pickerVisible, setPickerVisible] = useState(show);

  const contentsHeight = useRef(0);
  const contentsTransformY = useRef(new Animated.Value(0));
  const overlayOpacity = useRef(new Animated.Value(0));

  const keyboardVisible = useRef(false);

  const onKeyboardShow = useCallback(() => {
    keyboardVisible.current = true;
  }, []);

  const onKeyboardHide = useCallback(() => {
    keyboardVisible.current = false;
  }, []);

  useEffect(() => {
    const keyboardEventListeners = [
      Keyboard.addListener('keyboardDidShow', onKeyboardShow),
      Keyboard.addListener('keyboardDidHide', onKeyboardHide),
    ];

    return () => {
      keyboardEventListeners.forEach((eventListener) => eventListener.remove());
    };
  }, [onKeyboardHide, onKeyboardShow]);

  useEffect(() => {
    if (show) {
      Keyboard.dismiss();
      setPickerVisible(show);

      return;
    }

    Animated.parallel([
      Animated.timing(overlayOpacity.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentsTransformY.current, {
        toValue: contentsHeight.current,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPickerVisible(show);
    });
  }, [show]);

  useEffect(() => {
    if (!pickerVisible) {
      return;
    }

    Animated.parallel([
      Animated.timing(overlayOpacity.current, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentsTransformY.current, {
        toValue: 0,
        duration: 200,
        // キーボードが表示されている場合は表示タイミングを少し遅らせる
        delay: keyboardVisible.current ? 80 : 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pickerVisible]);

  const onLayoutContents = (event: LayoutChangeEvent) => {
    contentsHeight.current = event.nativeEvent.layout.height;
  };

  if (!pickerVisible) {
    return null;
  }

  return (
    <Portal>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity.current }]}>
        <Animated.View
          style={[styles.container, { transform: [{ translateY: contentsTransformY.current }] }]}
          onLayout={onLayoutContents}
        >
          <View style={styles.inputAccessoryViewContainer}>
            <TouchableOpacity style={styles.button} onPress={onDonePress}>
              <Text style={styles.buttonText}>完了</Text>
            </TouchableOpacity>
          </View>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Picker {...props} />
        </Animated.View>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.picker.overlay,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    backgroundColor: colors.picker.background,
    bottom: 0,
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '100%',
  },
  inputAccessoryViewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 3,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonText: {
    color: colors.inputAccessoryView.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PickerComponent;
