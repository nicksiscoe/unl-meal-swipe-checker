import 'react-native-gesture-handler';
import React, { useState, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Swipes from './src/views/swipes';
import Menus from './src/views/menus';
import Settings from './src/views/settings';
import Card from './src/assets/card.png';
import Menu from './src/assets/menu.png';
import Icon from './src/assets/icon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const Home = () => {
    return (
      <Tab.Navigator
        initialRouteName="Swipes"
        tabBarOptions={{
          activeTintColor: '#d00000',
          showLabel: false
        }}
        lazy={false}
      >
        <Tab.Screen
          name="Swipes"
          component={Swipes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="Card" fill={color} width={size + 5} height={size + 5} />
            )
          }}
        />
        <Tab.Screen
          name="Menus"
          component={Menus}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="Book" fill={color} width={size + 5} height={size + 5} />
            )
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen mode="float" name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  webView: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#262626'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 4,
    color: '#262626'
  },
  values: {
    marginTop: 2,
    marginBottom: 8
  },
  value: {
    fontSize: 26,
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 4,
    color: '#262626'
  },
  boldText: {
    fontWeight: '600',
  },
  caption: {
    fontWeight: '600',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.35)',
    marginTop: 4,
    marginBottom: 4,
    color: 'rgba(0, 0, 0, 0.35)'
  }
});

export default App;