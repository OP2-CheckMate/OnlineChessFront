import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, TextInput } from 'react-native'
import CustomButton from '../util/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BadLobbyCodeModal from '../util/BadLobbyCodeModal'
import { Lobby, QueuingScreenNavigationProp } from '../types/types'
import { useSocketSetup } from '../socket/useSocketSetup'
import socket from '../socket/socket'

type Props = {
  navigation: QueuingScreenNavigationProp;
}

const QueuingScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('')
  const [lobbyId, setlobbyId] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  useSocketSetup()

  /* gets player name from asyncStorage, and sets it in "name" state */
  useEffect(() => {
    getPlayerName()
  }, [])
  /* whenever name is changed´, check if it is empty or not, and set isDisabled accordingly */
  useEffect(() => {
    if (name.length > 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [name])

  //Creates a new game on backend, requires playername
  const createGame = () => {
    //console.log('creating lobby for ' + name)
    socket.emit('createLobby', name)
  }

  socket.on('createdLobby', (response: Lobby) =>{
    //console.log(response)
    navigation.navigate('LobbyCode', { lobby: response, playerName: name})
  })

  socket.on('gamefound', (response: Lobby) => {
    socket.emit('joinroom', response.lobbyId)
    navigation.navigate('LobbyCode', { lobby: response, playerName: name})
  })

  socket.on('joinedQueue', () => {
    console.log('joined queue')
    navigation.navigate('InQueue', {playerName: name})
  })

  //Joins existing lobby/game using lobbycode
  const joinGame = () => {
    socket.emit('joinlobby', parseInt(lobbyId),name)
  }

  /* stores the player name in asyncStorage, so player does not need to set name everytime app starts */
  const storePlayerName = async (value: string) => {
    try {
      await AsyncStorage.setItem('playerName', value)
    } catch (error) {
      console.log(error)
    }
  }
  /* gets the current selected playerName from asyncStorage, and sets it in state */
  const getPlayerName = async () => {
    try {
      const value = await AsyncStorage.getItem('playerName')
      if (value !== null) {
        setName(value)
      } else {
        setName('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const findGame = () => {
    socket.emit('joinqueue', name)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.innerView}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setName(text)
              storePlayerName(text)
            }}
            value={name}
            placeholder="Enter your name"
            autoCapitalize="words"
            autoComplete="off"
            autoFocus={true}
            placeholderTextColor="rgb(110,93,53)"
          />
          <View style={{flexDirection: 'row'}}>
            {/* custom made button with pressable component, so the button looks exactly the same in android and iOS */}
            <CustomButton title="Create Game" onPress={ () => createGame()} disabled={isDisabled} />
            <CustomButton title="Find game" onPress={ () => findGame()} disabled={isDisabled} />
          </View>
          <TextInput
            // Enter Lobby-ID
            style={styles.input}
            onChangeText={(e) => setlobbyId(e)}
            value={lobbyId}
            placeholder="Enter Lobby-Id"
            autoComplete="off"
            placeholderTextColor="rgb(110,93,53)"
          />
          <CustomButton title="Join Game" onPress={() => joinGame()} disabled={lobbyId.length>0 ? false : true} />
        </View>
      </ImageBackground>
      <BadLobbyCodeModal modalVisible={modalVisible} toggleModal={() => setModalVisible(!modalVisible)}></BadLobbyCodeModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgb(3,15,6)',
    elevation: 5,

    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 20
  },
  innerView: {
    alignItems: 'center',
    marginTop: 170
  }
})

export default QueuingScreen
