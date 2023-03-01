import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/Homepage';
import QueuingScreen from './components/QueuingScreen';
import Settings from './components/Settings';
import Game from './components/Game';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LobbyCodeScreen from './components/LobbyCodeScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    <StatusBar style='dark'></StatusBar>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="QueuingScreen" component={QueuingScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="LobbyCode" component={LobbyCodeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
    </>
  );
};

export default App;
