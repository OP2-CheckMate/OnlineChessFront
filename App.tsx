import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/Homepage';
import QueuingScreen from './components/QueuingScreen';
import Settings from './components/Settings';
import Game from './components/Game';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LobbyCodeScreen from './components/LobbyCodeScreen';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const storeTheme = async (value: string) => {
  try {
    await AsyncStorage.setItem('theme', value);
  } catch (error) {
    console.log(error);
  }
}

const App = () => {
  /* Get saved theme for board when app starts */
  useEffect (() => {
    let theme = AsyncStorage.getItem('theme');
    if (theme === null) {
      storeTheme('0');
    }
  }, [])

  /* Helper function to check what is stored in AsyncStorage, will be deleted later */
  AsyncStorage.getAllKeys((err, keys: any) => {
    AsyncStorage.multiGet(keys, (error, stores: any) => {
      stores.map((result:any, i:any, store:any) => {
        console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });

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
