import React, { useContext } from 'react';
import {
  StyleSheet, View, TouchableOpacity, GestureResponderEvent,
} from 'react-native';
import { FormGroupContext } from '@components/commons/FormGroupContainer';
import { colors } from '@styles/color';
import { RADIO_BUTTON_HEIGHT, RADIO_BUTTON_WIDTH, ACTIVE_OPACITY } from '@styles/index';

interface RadioButtonProp {
  checked: boolean;
  disabled?: boolean;
  checkedColor?: string;
  uncheckedColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const RadioButton = (props: RadioButtonProp) => {
  const {
    checked,
    disabled = false,
    checkedColor = colors.radioButton.checked,
    uncheckedColor = colors.radioButton.unchecked,
  } = props;

  const providedCallback = useContext(FormGroupContext);

  const onPress = (() => {
    if (disabled) {
      return undefined;
    }
    if (providedCallback) {
      return providedCallback;
    }

    // eslint-disable-next-line react/destructuring-assignment
    return props.onPress;
  })();

  const radioButtonStyle = {
    borderColor: checked ? checkedColor : uncheckedColor,
  };
  const markerStyle = {
    backgroundColor: checked ? checkedColor : colors.radioButton.background,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
    >
      <View style={[styles.container, radioButtonStyle]}>
        <View style={[styles.marker, markerStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: RADIO_BUTTON_HEIGHT / 2,
    borderWidth: 1,
    height: RADIO_BUTTON_HEIGHT,
    justifyContent: 'center',
    width: RADIO_BUTTON_WIDTH,
  },
  marker: {
    borderRadius: (RADIO_BUTTON_HEIGHT - 6) / 2,
    height: RADIO_BUTTON_HEIGHT - 6,
    width: RADIO_BUTTON_WIDTH - 6,
  },
});

export default RadioButton;
