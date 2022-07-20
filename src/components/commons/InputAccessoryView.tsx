import React from 'react';
import {
  StyleSheet, InputAccessoryView, View, TouchableOpacity, Text, InputAccessoryViewProps, Keyboard,
} from 'react-native';
import { colors } from '@styles/color';

const CustomInputAccessoryView = (props: InputAccessoryViewProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <InputAccessoryView {...props}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={Keyboard.dismiss}>
        <Text style={styles.buttonText}>完了</Text>
      </TouchableOpacity>
    </View>
  </InputAccessoryView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.inputAccessoryView.background,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'flex-end',
  },
  button: {
    height: '100%',
    justifyContent: 'center',
    marginRight: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.inputAccessoryView.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomInputAccessoryView;
