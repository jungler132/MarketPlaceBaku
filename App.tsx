/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Объявления',
            headerStyle: {
              backgroundColor: '#1A1A1A',
            },
            headerTintColor: '#FFD700',
            headerTitleStyle: {
              fontWeight: '700',
              fontFamily: 'serif',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'Просмотр объявления',
            headerStyle: {
              backgroundColor: '#1A1A1A',
            },
            headerTintColor: '#FFD700',
            headerTitleStyle: {
              fontWeight: '700',
              fontFamily: 'serif',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
