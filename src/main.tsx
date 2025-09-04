import getTabIcon from './functions/getTabIcon';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './tabs/home/HomeStack';
import { Color } from './theme/colors';
import ResourcesStack from './tabs/resources/ResourcesStack';
import AudioStack from './tabs/audio/AudioStack';
import ChurchLifeStack from './tabs/churchLife/ChurchLifeStack';
import useColorMap from './hooks/useColorMap';
import SettingsView from './tabs/settings/SettingsView';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string, color: Color) => (props: any) => {
    const name = getTabIcon(routeName);
    return <FontAwesome name={name} {...props} color={color} />;
};

function Main() {
    const colorMap = useColorMap();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: renderTabBarIcon(route.name, colorMap.primary),
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    borderColor: colorMap.secondary,
                    backgroundColor: colorMap.bgColor,
                },
                headerShadowVisible: true,
                tabBarActiveTintColor: colorMap.secondary,
                tabBarInactiveTintColor: colorMap.primary,
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    title: 'Home',
                }}
            />
            <Tab.Screen
                name="ChurchLifeTab"
                component={ChurchLifeStack}
                options={{
                    title: 'Church Life',
                }}
            />
            <Tab.Screen
                name="ResourcesTab"
                component={ResourcesStack}
                options={{
                    title: 'Resources',
                }}
            />
            <Tab.Screen
                name="AudioPlayerTab"
                component={AudioStack}
                options={{
                    title: 'Audio Player',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsView}
                options={{
                    title: 'Settings',
                }}
            />
        </Tab.Navigator>
    );
}

export default Main;
