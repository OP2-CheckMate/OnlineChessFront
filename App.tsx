import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/Homepage';
import QueuingScreen from './components/QueuingScreen';
import Settings from './components/Settings';
/* import Game from './components/Game'; */

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Homepage" component={Homepage} />
				<Stack.Screen name="QueuingScreen" component={QueuingScreen} />
				<Stack.Screen name="Settings" component={Settings} />
				{/* <Stack.Screen name="Game" component={Game} /> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
