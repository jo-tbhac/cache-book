import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle,
} from 'react-native';
import { colors } from '@styles/color';

interface ButtonProps {
  onPress: () => void;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Button = (props: ButtonProps) => {
  const {
    onPress,
    label,
    containerStyle,
    labelStyle,
  } = props;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.button.background,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  label: {
    color: colors.button.label,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Button;
