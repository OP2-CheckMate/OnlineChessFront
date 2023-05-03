import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { HomepageNavigationProp, HomepageRouteProp, Lobby } from '../types/types'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import socket from '../socket/socket'
import ReconnectModal from '../util/ReconnectModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {
  navigation: HomepageNavigationProp
  route: HomepageRouteProp
}

const Homepage = ({ route, navigation }: Props) => {

  const [modalVisible, setModalVisible] = React.useState(false)
  //const [lobby, setNewLobby] = React.useState<Lobby>()
  const [data, setData] = React.useState<any>([])
  const [opponentId, setOpponentId] = React.useState("")
  const [reconnecting, setReconnecting] = useState(false)
  const [name, setName] = useState('')
  //const navigation = useNavigation();
  //HOX
  //TypeError: undefined is not an object (evaluating 'lobby.player1')

  const [playerID, setPlayerID] = useState<string>('')


  const checkReconnect = (id: string) => {
    socket.emit('checkReconnect', id)
  }

  socket.on('reconnectToGame', (lobby: Lobby, opponentId: string) => {
    //setNewLobby(lobby)
    setOpponentId(opponentId)
    setModalVisible(true)
  })

  socket.on('lobbyData', (data: any, turn: string, lobby: Lobby) => {
    //console.log(data)
    //Navigate to board with data
    //setData(data)
    //console.log(name, newLobby, data)

    socket.off('lobbyData')
    //printData(data)
    navigation.navigate('Game', { lobby, playerName: name, reconnect: true, data: data, turn: turn})
  })

  const printData = (a: any) => {
    for (let row of a){
      let str = ''
      for (let piece of row){
        str += piece? `[${piece.type}] ` : '[ ] '
      }
      console.log(str)
    }
  }

  const reconnectToGame = () => {
    console.log('attempting reconnect')
    socket.emit('reconnectRequest', opponentId)
  }
  

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

  const getPlayerNameAndId = async () => {
    try {
      const value = await AsyncStorage.getItem('playerName')
      //const id = await AsyncStorage.getItem('playerID')
      if (value !== null) {
        setName(value)
      } else {
        setName('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPlayerNameAndId()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <ImageBackground source={require('./images/ChessGameFrontpagePic2.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('QueuingScreen')}
            style={styles.appButton}
          >
            <Text style={styles.appButtonText}>Start Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.appButton}
          >
            <Text style={styles.appButtonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Game', { lobby: { lobbyId: 0, player1: { name: 'p1', id: '0' } }, playerName: 'p1', reconnect: false })}
            style={styles.appButton}
          >
            <Text style={styles.appButtonText}>Board</Text>
          </TouchableOpacity>
        </View>
        <ReconnectModal modalVisible={modalVisible} toggleModal={() => setModalVisible(!modalVisible)} navigate={reconnectToGame} />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  appButton: {
    backgroundColor: 'rgba(138,124,74, 0.88)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '55%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(170, 170, 170, 0.5)',
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 40,

  },
  appButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  image: {
    flex: 1,
    width: '100%'
  }
})

export default Homepage
