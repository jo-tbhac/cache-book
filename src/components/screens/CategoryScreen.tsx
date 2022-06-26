import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CategoryScreen = () => (
  <View style={styles.container}>
    <Text>Category</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryScreen;
