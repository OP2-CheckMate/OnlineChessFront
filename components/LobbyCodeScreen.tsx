import React from "react";
import { View, Text, Button } from "react-native";
import {Lobby} from '../types/types'

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