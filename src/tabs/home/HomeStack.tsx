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
import NewAnnouncement from './stacks/announcements/NewAnnouncement';
import { useEffect } from 'react';
import resourcesStorage from '../../storage/resourcesStorage';
import getCollectionData from '../../functions/getCollectionData';
import { IEvent } from '../../interfaces/IEvent';
import { IPassage } from '../../interfaces/IPassage';
import { IAnnouncement } from '../../interfaces/IAnnouncement';
import { Timestamp, where } from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

function HomeStack() {
    const colorMap = useColorMap();

    const {
        passages,
        events,
        announcements,
        setPassages,
        setAnnouncements,
        setEvents,
    } = resourcesStorage();

    useEffect(() => {
        if (passages.length === 0) {
            getCollectionData<IPassage>('passages').then(res =>
                res ? setPassages(res) : null,
            );
        }
        if (events.length === 0) {
            const now = Timestamp.fromDate(new Date());
            getCollectionData<IEvent>('events', where('date', '>=', now)).then(
                res => (res ? setEvents(res) : null),
            );
        }
        if (announcements.length === 0) {
            getCollectionData<IAnnouncement>('announcements').then(res =>
                res ? setAnnouncements(res) : null,
            );
        }
    }, [
        announcements.length,
        events.length,
        passages.length,
        setAnnouncements,
        setEvents,
        setPassages,
    ]);

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
            <Stack.Screen
                options={{ headerTitle: 'New Announcement' }}
                name="New Announcement"
                component={NewAnnouncement}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
