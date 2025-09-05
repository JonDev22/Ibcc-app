import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './stacks/home/Home';
import { HomeNavigationParamList } from './types/navigationTypes';
import UpcomingEvents from './stacks/upcomingEvents/UpcomingEvents';
import UpcomingEventsDetails from './stacks/upcomingEvents/UpcomingEventsDetails';
import getStackScreenOptions from '../../functions/getStackScreenOptions';
import Announcements from './stacks/announcements/Announcements';
import AnnouncementDetail from './stacks/announcements/AnnouncementsDetail';
import useColorMap from '../../hooks/useColorMap';
import NewEvent from './stacks/upcomingEvents/NewEvent';

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

function HomeStack() {
    const colorMap = useColorMap();

    return (
        <Stack.Navigator
            screenOptions={getStackScreenOptions(
                colorMap.primary,
                colorMap.bgColor,
            )}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Upcoming Events" component={UpcomingEvents} />
            <Stack.Screen
                options={{ headerTitle: '' }}
                name="Upcoming Events Details"
                component={UpcomingEventsDetails}
            />
            <Stack.Screen name="Announcements" component={Announcements} />
            <Stack.Screen
                options={{ headerTitle: '' }}
                name="Announcements Details"
                component={AnnouncementDetail}
            />
            <Stack.Screen
                options={{ headerTitle: 'New Event' }}
                name="New Event"
                component={NewEvent}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
