import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Homepage from './components/Homepage'
import QueuingScreen from './components/QueuingScreen'
import Settings from './components/Settings'
import Game from './components/Game'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import LobbyCodeScreen from './components/LobbyCodeScreen'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { AppNavigationProp, Lobby, StackParamList } from './types/types'
import { InQueueScreen } from './components/InQueueScreen'
import socket from './socket/socket'
import ReconnectModal from './util/ReconnectModal'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<StackParamList>()

const storeTheme = async (value: string) => {
  try {
    await AsyncStorage.setItem('theme', value)
  } catch (error) {
    console.log(error)
  }
}



const App = () => {

  
/*
  useEffect(() => {
    console.log(data)
    if (data.length > 0) navigation.navigate('Game')
  }, [data])
*/

  /* Get saved theme for board when app starts */
  useEffect(() => {
    const theme = AsyncStorage.getItem('theme')
    if (theme === null) {
      storeTheme('0')
    }
  }, [])

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Homepage' component={Homepage} options={{ headerShown: false }} />
            <Stack.Screen name='QueuingScreen' component={QueuingScreen} />
            <Stack.Screen name='Settings' component={Settings} />
            <Stack.Screen name='Game' component={Game} />
            <Stack.Screen name='LobbyCode' component={LobbyCodeScreen} />
            <Stack.Screen name='InQueue' component={InQueueScreen} />
          </Stack.Navigator>
        </NavigationContainer >
        
      </GestureHandlerRootView >
    </>
  )
}

export default App