import getTabIcon from './functions/getTabIcon';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './tabs/home/HomeStack';
import { colors } from './theme/colors';
import ResourcesStack from './tabs/resources/ResourcesStack';
import AudioStack from './tabs/audio/AudioStack';
import { ResourceProvider } from './contexts/ResourceContext';
import ChurchLifeStack from './tabs/churchLife/ChurchLifeStack';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string) => (props: any) => {
    const name = getTabIcon(routeName);
    return <FontAwesome name={name} {...props} color={colors.petrolBlue} />;
};

function Main() {
    return (
        <ResourceProvider>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: renderTabBarIcon(route.name),
                    headerShown: false,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        borderColor: colors.petrolBlue,
                        backgroundColor: colors.white50,
                    },
                    headerShadowVisible: true,
                    tabBarActiveTintColor: colors.petrolBlue,
                    tabBarInactiveTintColor: colors.petrolBlue,
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
            </Tab.Navigator>
        </ResourceProvider>
    );
}

export default Main;
