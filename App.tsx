import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import HomepageTabNav from './components/HomepageTabNav';
import QueuingScreen from './components/QueuingScreen';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={HomepageTabNav}></Stack.Screen>
        <Stack.Screen name="Queue" component={QueuingScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App