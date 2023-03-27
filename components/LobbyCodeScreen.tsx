import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { LobbyCodeNavigationProp, LObbyCodeRouteProp } from '../types/types'
import CustomButton from '../util/CustomButton'

type Props = {
  navigation: LobbyCodeNavigationProp;
  route: LObbyCodeRouteProp;
}
//After creating a lobby the player sees lobby id which can be shared to
//another player to join the lobby
const LobbyCodeScreen = ({ route, navigation }: Props) => {
  const { lobby, playerName } = route.params
  console.log(lobby)
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={{ flex: 1 }}>
        <View style={styles.background}>
          <View style={styles.center}>
            <Text style={{ fontSize: 45 }}>LOBBY CODE:</Text>
            <Text style={{ fontSize: 65 }}>{lobby.lobbyId}</Text>
          </View>
          <View style={styles.center}>
            <Text style={{ fontSize: 20 }}>{lobby.player1.name} VS. {lobby.player2 ? lobby.player2.name : 'TBD'}</Text>
          </View>

        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CustomButton title="Open Board" onPress={() => navigation.navigate('Game', { lobby, playerName })}></CustomButton>
        </View>
      </ImageBackground>
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