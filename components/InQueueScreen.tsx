import React, { FC } from 'react'
import { InQueueNavigationProp, InQueueRouteProp, Lobby } from '../types/types'
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native'
import socket from '../socket/socket'
import CustomButton from '../util/CustomButton'

interface Props {
  navigation: InQueueNavigationProp
  route: InQueueRouteProp
}

export const InQueueScreen: FC<Props> = ({ route, navigation }: Props) => {
  const { playerName, playerId } = route.params

  socket.on('gamefound', (response: Lobby) => {
    socket.emit('joinroom', response.lobbyId)
    navigation.navigate('LobbyCode', {
      lobby: response,
      playerName: playerName,
    })
  })

  const leaveQueue = () => {
    socket.emit('leaveQueue', playerId)
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('./images/settingsBgImage.png')}
        resizeMode='cover'
        style={{ flex: 1 }}
      >
        <View style={styles.background}>
          <View style={styles.center}>
            <Text style={{ marginBottom: 20, fontSize: 20 }}>
              Searching for an opponent
            </Text>
            <ActivityIndicator
              color='#1A1F16'
              style={{ marginBottom: 20 }}
              size='large'
              animating={true}
            ></ActivityIndicator>
            <CustomButton
              title='Leave queue'
              onPress={() => leaveQueue()}
              disabled={false}
            />
          </View>
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
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
