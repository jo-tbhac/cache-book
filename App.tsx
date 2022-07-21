import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PortalProvider } from '@gorhom/portal';
import { RecoilRoot } from 'recoil';
import ButtomTabNavigator from '@navigators/ButtomTabNavigator';

const App = () => (
  <RecoilRoot>
    <PortalProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <ButtomTabNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </PortalProvider>
  </RecoilRoot>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
