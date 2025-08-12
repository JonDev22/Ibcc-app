import getTabIcon from './functions/getTabIcon';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './tabs/home/HomeStack';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string) => (props: any) => {
    const name = getTabIcon(routeName);
    return <FontAwesome name={name} {...props} />;
};

function Main() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: renderTabBarIcon(route.name),
                headerShown: false,
                tabBarStyle: { backgroundColor: 'lightgrey' },
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
        </Tab.Navigator>
    );
}

export default Main;
