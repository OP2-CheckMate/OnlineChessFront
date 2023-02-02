import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const HomepageTabNav = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false
                }}
        >
            <Tab.Screen name="Home" component={Homepage} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
)}

export default HomepageTabNav