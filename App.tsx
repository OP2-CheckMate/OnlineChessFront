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
import { StackParamList } from './types/types'
import { InQueueScreen } from './components/InQueueScreen'
import socket from './socket/socket'

const Stack = createNativeStackNavigator<StackParamList>()

const storeTheme = async (value: string) => {
  try {
    await AsyncStorage.setItem('theme', value)
  } catch (error) {
    console.log(error)
  }
}

const App = () => {
  const [playerID, setPlayerID] = useState<string>('')
  /* Get saved theme for board when app starts */
  useEffect(() => {
    const theme = AsyncStorage.getItem('theme')
    if (theme === null) {
      storeTheme('0')
    }
  }, [])

  const checkReconnect = (id: string) => {
    socket.emit('checkReconnect', id)
  }

  socket.on('reconnectToGame', () => {
    console.log('RECONNECT AIVAILABLE')
  })

  const setupPlayerId = async (id: string) =>{
    const storage = await AsyncStorage.getItem('playerID')
    if(await !storage){
      console.log('new id')
      AsyncStorage.setItem('playerID', id)
      setPlayerID(id)
      //checkReconnect(id)
    }else{
      console.log('old id')
      setPlayerID(storage!)
      checkReconnect(storage!)
    }
  }

  socket.on('connectionSuccessfull', (id: string) => {
    console.log('connection ok')
    setupPlayerId(id)
  })

  /* Helper function to check what is stored in AsyncStorage, will be deleted later */
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys!, (error, stores) => {
      stores!.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] })
        return true
      })
    })
  })

  return (
    <>
      <StatusBar style='dark'></StatusBar>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="QueuingScreen" component={QueuingScreen} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="LobbyCode" component={LobbyCodeScreen} />
            <Stack.Screen name="InQueue" component={InQueueScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  )
}

export default App
