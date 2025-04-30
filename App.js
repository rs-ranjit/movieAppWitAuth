import {View, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthTabNavigation from './navigation/Tab';
import UnAuthStackNavigation from './navigation/Stack';
import {AuthProvider, useAuth} from './context/authContext';

const RootNavigation = () => {
  const {authorized} = useAuth();
  return authorized ? <AuthTabNavigation /> : <UnAuthStackNavigation />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
