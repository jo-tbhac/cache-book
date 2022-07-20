import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PortalProvider } from '@gorhom/portal';
import ButtomTabNavigator from '@navigators/ButtomTabNavigator';

const App = () => (
  <PortalProvider>
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <ButtomTabNavigator />
      </SafeAreaView>
    </NavigationContainer>
  </PortalProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
