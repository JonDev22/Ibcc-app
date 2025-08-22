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
import { IEvent } from '../../../../../interfaces/IEvent';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events'
>;

const events: IEvent[] = [
    {
        date: new Date('2024-08-31'),
        title: 'Community Meal',
        text: 'Community Meal with IBC Cologne, AIC and IGK.',
        location: 'IBC Cologne',
        details:
            'As the church plant in Aachen grows, it is finally time to commit and send the team officially to reach the city of Aachen. Therefore, we use the community meal to celebrate church multiplication. Part of the team and therefore which we will officially be sending is our Pastor David Martin, Lucas Santos and the Barretos.',
        contact: 'Rumpel',
    },
    {
        date: new Date('2024-09-13'),
        title: 'Renovation Part I',
        text: 'Renovation of the new church building in Herbigstraße.',
        location: 'IBC Cologne',
        details:
            'Our host church has kindly offered us a room we will be able to use. To be able to offer it as a cosy, and welcoming room, it needs some renovation. We will be painting the walls, cleaning the floors, and setting up furniture. No special skills are required, just a willingness to help out. We will provide all the materials needed.',
    },
    {
        date: new Date('2024-09-14'),
        title: 'Baptism',
        text: 'Making a faithful and public commitment to Jesus Christ.',
        location: 'IBC Cologne',
        details:
            'Excitingly, we will be baptizing in our church. As always, baptism is a reason to celebrate as Christ in His sovereign Grace leads another soul to Himself. If you are interested in being baptized, please contact us at!',
    },
    {
        date: new Date('2024-09-27'),
        title: 'Renovation Part II',
        text: 'Renovation of the new church building in Herbigstraße.',
        location: 'IBC Cologne',
        details:
            'Our host church has kindly offered us a room we will be able to use. To be able to offer it as a cosy, and welcoming room, it needs some renovation. We will be painting the walls, cleaning the floors, and setting up furniture. No special skills are required, just a willingness to help out. We will provide all the materials needed.',
    },
    {
        date: new Date('2024-10-12'),
        title: 'AGM',
        text: 'Mark the date! Our autumn AGM is coming up.',
        location: 'IBC Cologne',
        details:
            'The autumn AGM is coming up. We will be discussing the church plant in Aachen, the renovation of the new church building in Herbigstraße, and other important topics. Please make sure to attend and bring your questions and suggestions. As always, we will be welcoming new members.',
    },
];

const getUpcomingEvents = (allEvents: IEvent[], today = new Date()) => {
    return allEvents
        .filter(e => e.date <= today)
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .slice(0, 2);
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
