import FontAwesome from '@react-native-vector-icons/fontawesome';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../../../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from '../../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events'
>;

interface IEvent {
    title: string;
    date: Date;
    description: string;
    location: string;
}

const events: IEvent[] = [
    {
        title: 'Community Gathering',
        date: new Date('2025-09-12'),
        description: 'Join us for fellowship.',
        location: 'City Hall',
    },
    {
        title: 'Bible Study',
        date: new Date('2025-10-15'),
        description: 'Deep dive into scripture.',
        location: 'City Hall',
    },
    {
        title: 'Charity Event',
        date: new Date('2025-06-20'),
        description: 'Support local initiatives.',
        location: 'City Hall',
    },
    {
        title: 'Youth Meetup',
        date: new Date('2025-06-25'),
        description: 'Fun activities for young adults.',
        location: 'City Hall',
    },
];

const getUpcomingEvents = (allEvents: IEvent[], today = new Date()) => {
    return allEvents
        .filter(e => e.date >= today)
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .slice(0, 3);
};

function TopUpcomingEvents() {
    const navigation = useNavigation<NavigationProps>();
    const upcoming = getUpcomingEvents(events);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Upcoming Events')}
            >
                <View style={styles.header}>
                    <FontAwesome
                        name="calendar"
                        size={24}
                        color={colors.petrolBlue}
                    />
                    <Text style={styles.headerText}>Upcoming Events</Text>
                    <FontAwesome
                        name="chevron-right"
                        size={16}
                        color={colors.petrolBlue}
                    />
                </View>
            </TouchableOpacity>

            <FlatList
                data={upcoming}
                keyExtractor={item => item.date.toDateString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <FontAwesome
                                name="star"
                                size={16}
                                color={colors.orange}
                            />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <Text style={styles.date}>
                            {item.date.toDateString()}
                        </Text>
                        {item.description && (
                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        )}
                        <View style={styles.locationRow}>
                            <FontAwesome
                                name="map-pin"
                                size={14}
                                color={colors.orange}
                            />
                            <Text style={styles.location}>{item.location}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default TopUpcomingEvents;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    header: {
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 16,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    card: {
        borderRadius: 12,
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    date: {
        fontSize: 14,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },
    location: {
        fontSize: 14,
        color: colors.lightPetrolBlue,
    },
});
