import React from "react";
import { View, Text, ImageBackground} from "react-native";
import {Lobby} from '../types/types'
import CustomButton from "../util/CustomButton";

//After creating a lobby the player sees lobby id which can be shared to
//another player to join the lobby
const LobbyCodeScreen = ({ route, navigation }: any) => {
    const { lobby, playerName } = route.params
    return(
        <View style={{flex: 1}}>
            <ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'rgba(255,255,255,0.7)', margin: 50, borderRadius: 10}}>
                <Text style={{fontSize: 45}}>LOBBY CODE:</Text>
                <Text style={{fontSize: 65}}>{lobby.lobbyId}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <CustomButton title="Open Board" onPress={() => navigation.navigate('Game', {lobby, playerName})}></CustomButton>
            </View>
            </ImageBackground>
        </View>
    )
}

export default LobbyCodeScreen