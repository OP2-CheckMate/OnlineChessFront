import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, TextInput } from 'react-native'
import { HOST_NAME } from '@env'
import CustomButton from '../util/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BadLobbyCodeModal from '../util/BadLobbyCodeModal'
import { Lobby, QueuingScreenNavigationProp } from '../types/types'

type Props = {
  navigation: QueuingScreenNavigationProp;
}

const QueuingScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('')
  const [lobbyId, setlobbyId] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isJoinDisabled, setIsJoinDisabled] = useState(true)
  const [id, setId] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  /* gets player name from asyncStorage, and sets it in "name" state */
  useEffect(() => {
    getPlayerName()
  }, [])
  /* whenever name is changed´, check if it is empty or not, and set isDisabled accordingly */
  useEffect(
    () => {
      if (name.length > 0) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    },
    [name]
  )

  //Creates a new game on backend, requires playername
  const createGame = () => {
    // Set a name for player
    console.log(HOST_NAME)
    fetch('http://' + HOST_NAME + ':8080/api/queuing/createlobby', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name: name })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        navigation.navigate('LobbyCode', { lobby: data, playerName: name })
      })
      .catch((err) => console.error(err))
  }

  const badLobbyCode = () => {
    setModalVisible(true)
  }

  //Joins existing lobby/game using lobbycode
  const joinGame = () => {
    // Post name and lobbyId to server
    fetch('http://' + HOST_NAME + ':8080/api/queuing/joinlobby', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        lobbyId: parseInt(lobbyId),
        name: name
      })
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('code ' + response.status)
        }
        return response.json()
      })
      .then((data) => {
        const lobby: Lobby = data!
        navigation.navigate('LobbyCode', { lobby: data, playerName: lobby.player2!.name }) //TODO: REDIRECT TO BOARD
      })
      .catch((err) => {
        if (err.message === 'code 400') badLobbyCode()
        console.log(err)
      })
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
          {/* custom made button with pressable component, so the button looks exactly the same in android and iOS */}
          <CustomButton title="Create Game" onPress={createGame} disabled={isDisabled} />
          <TextInput
            // Enter Lobby-ID
            style={styles.input}
            onChangeText={(text) => {
              setlobbyId(text)
              if (text !== '' && name !== '') {
                setIsJoinDisabled(false)
              } else {
                setIsJoinDisabled(true)
              }
            }}
            value={lobbyId}
            placeholder="Enter Lobby-Id"
            autoComplete="off"
            placeholderTextColor="rgb(110,93,53)"
          />
          <CustomButton title="Join Game" onPress={joinGame} disabled={isJoinDisabled} />
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
