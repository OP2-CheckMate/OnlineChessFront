import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { Lobby, LobbyCodeNavigationProp, LobbyCodeRouteProp } from '../types/types'
import CustomButton from '../util/CustomButton'
import socket from '../socket/socket'
import { Snackbar } from "@react-native-material/core";

type Props = {
  navigation: LobbyCodeNavigationProp;
  route: LobbyCodeRouteProp;
}
//After creating a lobby the player sees lobby id which can be shared to
//another player to join the lobby
const LobbyCodeScreen = ({ route, navigation }: Props) => {
  const {  playerName } = route.params
  const [player2Name, setPlayer2Name] = useState<string>('TBD')
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [lobby, setLobby] = useState(route.params.lobby)

  socket.emit('joinroom', lobby.lobbyId)
  socket.on('playerJoined', (result: Lobby) =>{
    setPlayer2Name(result.player2!.name)
    setLobby(result)
    setSnackIsVisible(true)
    setTimeout(() => {setSnackIsVisible(false)}, 5000)
  })
  
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={{ flex: 1 }}>
        <View style={styles.background}>
          <View style={styles.center}>
            <Text style={{ fontSize: 45 }}>LOBBY CODE:</Text>
            <Text style={{ fontSize: 65 }}>{lobby.lobbyId}</Text>
          </View>
          <View style={styles.center}>
            <Text style={{ fontSize: 20 }}>{lobby.player1.name} VS. {lobby.player2 ? lobby.player2.name : player2Name}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CustomButton title="Open Board" onPress={() => navigation.navigate('Game', { lobby, playerName})}></CustomButton>
        </View>
      </ImageBackground>
      {snackIsVisible?
      <Snackbar
      message={`${player2Name} joined`}
      style={{position: "absolute", start: 30, end: 30, bottom: 16, backgroundColor: 'rgba(255,255,255,0.7)'}}
      />: <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    margin: 50,
    borderRadius: 10
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LobbyCodeScreen


