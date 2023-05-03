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
import { Lobby, StackParamList } from './types/types'
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

  const [modalVisible, setModalVisible] = React.useState(false)
  const [newLobby, setNewLobby] = React.useState<Lobby>()
  const [data, setData] = React.useState<any>()
  const [opponentId, setOpponentId] = React.useState("")

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

  socket.on('reconnectToGame', (lobby: Lobby, opponentId: string) => {
    // Save lobby to const
    // if player wants to reconnect -> socket fetch to reconnectRequest, with variable opponentId

    console.log('RECONNECT AVAILABLE')
    setNewLobby(lobby)
    setOpponentId(opponentId)
    setModalVisible(true)
    socket.emit('reconnectRequest', opponentId)
  })

  socket.on('lobbyData', (data: any) => {
    //Navigate to board with data
    setData(data)
  })
  
  

  const setupPlayerId = async (id: string) => {
    const storage = await AsyncStorage.getItem('playerID')
    if (await !storage) {
      console.log('new id')
      AsyncStorage.setItem('playerID', id)
      setPlayerID(id)
      //checkReconnect(id)
    } else {
      console.log('old id')
      setPlayerID(storage!)
      checkReconnect(storage!)
    }
  }

  socket.on('connectionSuccessfull', (id: string) => {
    console.log('connection ok')
    setupPlayerId(id)
  })

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
        <ReconnectModal modalVisible={modalVisible} toggleModal={() => setModalVisible(!modalVisible)} navigate={() => navigation.navigate('Game', {playerName: opponentId, lobby: newLobby!, reconnect: true, data: data})} />
      </GestureHandlerRootView >
    </>
  )
}

export default App