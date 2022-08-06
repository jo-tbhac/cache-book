import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@styles/color';

const Border = () => (
  <View style={styles.border} />
);

const styles = StyleSheet.create({
  border: {
    backgroundColor: colors.list.border,
    flex: 1,
    height: 1,
  },
});

export default Border;
