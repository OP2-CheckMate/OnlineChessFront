import React from "react";
import { View, Text, Button } from "react-native";
import {Lobby} from '../types/types'

const LobbyCodeScreen = (props: any) => {

    const LOBBY: Lobby = props.lobby

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>LOBBY CODE:</Text>
                <Text>{LOBBY.lobbyId}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button title="Open Board"></Button>
            </View>
        </View>
    )
}

export default LobbyCodeScreen