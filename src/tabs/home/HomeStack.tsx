import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './stacks/home/Home';
import { HomeNavigationParamList } from './types/navigationTypes';
import UpcomingEvents from './stacks/upcomingEvents/UpcomingEvents';
import UpcomingEventsDetails from './stacks/upcomingEvents/UpcomingEventsDetails';
import getStackScreenOptions from '../../functions/getStackScreenOptions';
import Announcements from './stacks/announcements/Announcements';
import AnnouncementDetail from './stacks/announcements/AnnouncementsDetail';

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={getStackScreenOptions()}>
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
        </Stack.Navigator>
    );
}

export default HomeStack;
