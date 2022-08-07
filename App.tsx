import React, { useEffect, useState, Suspense } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { PortalProvider } from '@gorhom/portal';
import { RecoilRoot } from 'recoil';
import Dialog from '@components/commons/Dialog';
import { createTable } from '@db/query';
import ButtomTabNavigator from '@navigators/ButtomTabNavigator';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    createTable()
      .then(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      })
      .catch(() => {
        // TODO handle error
      });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <RecoilRoot>
      <Suspense fallback={null}>
        <PortalProvider>
          <NavigationContainer>
            <SafeAreaView style={styles.container}>
              <ButtomTabNavigator />
            </SafeAreaView>
          </NavigationContainer>
          <Dialog />
        </PortalProvider>
      </Suspense>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
