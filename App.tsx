import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage';
import Settings from './components/Settings';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home"component={Homepage} />
      <Tab.Screen name="Settings"component={Settings} />
    </Tab.Navigator>
    </NavigationContainer>  
);}

export default App