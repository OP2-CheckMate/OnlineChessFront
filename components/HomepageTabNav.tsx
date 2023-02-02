import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const HomepageTabNav = () => {
    return(
    <NavigationContainer independent={true}>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Homepage} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    </NavigationContainer>
)}

export default HomepageTabNav