
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import OcjeneScreen from './ocjeneScreen'; 
import FocusScreen from './focusScreen';
import HomeScreen from './homeScreen';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync().catch(console.warn);

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function OcjeneStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="OcjeneScreen" component={OcjeneScreen} />
    </Stack.Navigator>
  );
}

function FocusStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="FocusScreen" component={FocusScreen} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (

    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
        
          if (route.name === 'Početna') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ocjene') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Focus') {
            iconName = focused ? 'eye' : 'eye-outline';
          }
        
          return <Icon name={iconName} size={size} color="white" />;
        },
        tabBarActiveTintColor: 'white', // White color for the active tab icon
        tabBarInactiveTintColor: 'white', // White color for the inactive tab icon
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#1F5AA6', // Setting the background color
        },
      })}
    >
      <Tab.Screen options={{headerShown: false}} name="Početna" component={HomeStack} />
      <Tab.Screen options={{headerShown: false}} name="Ocjene" component={OcjeneStack} />
      <Tab.Screen options={{headerShown: false}} name="Focus" component={FocusStack} />
    </Tab.Navigator>
  
  );
}



export default function App() {

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or any other resources here
        await Font.loadAsync({
          'Inter': require('./assets/fonts/Inter-Black.ttf'),
        });

        // After resources are loaded, hide the splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer >
      <MyTabs/>
    </NavigationContainer>
  );
}
