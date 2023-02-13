import React from "react";
import { View, Text, Button } from "react-native";
import {Lobby} from '../types/types'

//After creating a lobby the player sees lobby id which can be shared to
//another player to join the lobby
const LobbyCodeScreen = ({ route, navigation }: any) => {
    const { lobby } = route.params
    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 45}}>LOBBY CODE:</Text>
                <Text style={{fontSize: 65}}>{lobby.lobbyId}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button title="Open Board" onPress={() => navigation.navigate('Game')}></Button>
            </View>
        </View>
    )
}

export default LobbyCodeScreen