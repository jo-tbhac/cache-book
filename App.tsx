import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ButtomTabNavigator from '@navigators/ButtomTabNavigator';

const App = () => (
  <NavigationContainer>
    <ButtomTabNavigator />
    <StatusBar />
  </NavigationContainer>
);

export default App;
