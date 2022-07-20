import React, { FC, createContext } from 'react';
import {
  StyleProp, ViewStyle, View, TouchableOpacity, GestureResponderEvent,
} from 'react-native';

type FormGroupContextType = (event: GestureResponderEvent) => void;

export const FormGroupContext = createContext<FormGroupContextType>(null);

interface FormGroupContainerProps {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
}

const FormGroupContainer: FC<FormGroupContainerProps> = (props) => {
  const {
    children, containerStyle, style, onPress,
  } = props;

  return (
    <FormGroupContext.Provider value={onPress}>
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <View style={style}>
          {children}
        </View>
      </TouchableOpacity>
    </FormGroupContext.Provider>
  );
};

export default FormGroupContainer;
