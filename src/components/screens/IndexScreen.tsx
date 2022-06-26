import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const IndexScreen = () => (
  <View style={styles.container}>
    <Text>Index</Text>
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

export default IndexScreen;
