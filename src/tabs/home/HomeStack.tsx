import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './stacks/home/Home';
// import UpcomingEvents from './stacks/upcomingEvents/UpcomingEvents';
import { colors } from '../../theme/colors';
import { HomeNavigationParamList } from './types/navigationTypes';
import UpcomingEvents from './stacks/upcomingEvents/UpcomingEvents';
import UpcomingEventsDetails from './stacks/upcomingEvents/UpcomingEventsDetails';

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.lightPetrolBlue,
                },
                headerTintColor: 'orange',
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Upcoming Events" component={UpcomingEvents} />
            <Stack.Screen
                options={{ headerTitle: '' }}
                name="Upcoming Events Details"
                component={UpcomingEventsDetails}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
