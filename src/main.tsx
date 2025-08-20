import getTabIcon from './functions/getTabIcon';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './tabs/home/HomeStack';
import { colors } from './theme/colors';
import useColorMap from './hooks/useColorMap';
import ResourcesStack from './tabs/resources/ResourcesStack';
import Audio from './tabs/audio/Audio';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string) => (props: any) => {
    const name = getTabIcon(routeName);
    return <FontAwesome name={name} {...props} color={colors.white50} />;
};

function Main() {
    const colorMap = useColorMap();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: renderTabBarIcon(route.name),
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colorMap.primary,
                },
            })}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarActiveTintColor: colors.white50,
                    tabBarInactiveTintColor: colors.white50,
                }}
            />
            <Tab.Screen
                name="ResourcesStack"
                component={ResourcesStack}
                options={{
                    tabBarActiveTintColor: colors.white50,
                    tabBarInactiveTintColor: colors.white50,
                }}
            />
            <Tab.Screen
                name="AudioPlayerStack"
                component={Audio}
                options={{
                    tabBarActiveTintColor: colors.white50,
                    tabBarInactiveTintColor: colors.white50,
                }}
            />
        </Tab.Navigator>
    );
}

export default Main;
