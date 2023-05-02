import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

export interface Player {
  id: string;
  socketId?: string;
  name: string;
}

export type PlayerColor = 'b' | 'w';

export interface Lobby {
  lobbyId: number;
  player1: Player;
  player2?: Player;
  recentMove?: Move;
  isGameOver?: boolean;
}

export interface Move {
  from: string,
  to: string,
}


// If you need to pass props in navigation or route add them here
export type StackParamList = {
  Homepage: undefined;
  QueuingScreen: undefined;
  Settings: undefined;
  Game: {
    playerName: string;
    lobby: Lobby;
    reconnect: boolean;
    data?: any;
  };
  LobbyCode: {
    lobby: Lobby;
    playerName: string;
  };
  InQueue: {
    playerName: string;
    playerId: string;
  };
}

// Props for navigation and route for all screens, not all used tho
export type HomepageNavigationProp = NativeStackNavigationProp<StackParamList, 'Homepage'>
export type HomepageRouteProp = RouteProp<StackParamList, 'Homepage'>

export type QueuingScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'QueuingScreen'>
export type QueuingScreenRouteProp = RouteProp<StackParamList, 'QueuingScreen'>

export type SettingsNavigationProp = NativeStackNavigationProp<StackParamList, 'Settings'>
export type SettingsRouteProp = RouteProp<StackParamList, 'Settings'>

export type GameNavigationProp = NativeStackNavigationProp<StackParamList, 'Game'>
export type GameRouteProp = RouteProp<StackParamList, 'Game'>

export type LobbyCodeNavigationProp = NativeStackNavigationProp<StackParamList, 'LobbyCode'>
export type LobbyCodeRouteProp = RouteProp<StackParamList, 'LobbyCode'>

export type InQueueNavigationProp = NativeStackNavigationProp<StackParamList, 'InQueue'>
export type InQueueRouteProp = RouteProp<StackParamList, 'InQueue'>