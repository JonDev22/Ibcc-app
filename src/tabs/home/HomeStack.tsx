import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './stacks/home/Home';
// import UpcomingEvents from './stacks/upcomingEvents/UpcomingEvents';
import { colors } from '../../theme/colors';
import { HomeNavigationParamList } from './types/navigationTypes';
import UpcomingEvents from './stacks/upcomingEvents/UpcomingEvents';
import UpcomingEventsDetails from './stacks/upcomingEvents/UpcomingEventsDetails';
import MinistryList from './stacks/ministries/Ministries';
import Leaders from './stacks/leaders/Leaders';
import LifeGroupList from './stacks/lifegroups/Lifegroups';

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.white50,
                },
                headerShadowVisible: true,
                headerTintColor: colors.petrolBlue,
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
            <Stack.Screen name="Ministries" component={MinistryList} />
            <Stack.Screen name="Leaders" component={Leaders} />
            <Stack.Screen name="Lifegroups" component={LifeGroupList} />
        </Stack.Navigator>
    );
}

export default HomeStack;
