import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { IEvent } from '../../../../interfaces/IEvent';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events Details'
>;

function EventsDisplayCard({ date, location, title, text, details }: IEvent) {
    const navigation = useNavigation<NavigationProps>();

    const handlePress = () => {
        navigation.navigate('Upcoming Events Details', {
            location,
            title,
            text,
            date: date.toDateString(),
            details: details,
        }); // Pass the full event object to EventDetail
    };

    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <FontAwesome
                    name="calendar"
                    size={14}
                    color={colors.petrolBlue}
                />
                <Text style={styles.date}>{date.toDateString()}</Text>
                {location && (
                    <View style={styles.locationRow}>
                        <FontAwesome
                            name="map-pin"
                            size={14}
                            color={colors.orange}
                        />
                        <Text style={styles.location}>{location}</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity
                onPress={handlePress}
                style={styles.touchableStyle}
            >
                <Text style={styles.title}>{title}</Text>
                <FontAwesome
                    name="chevron-right"
                    size={20}
                    color={colors.petrolBlue}
                />
            </TouchableOpacity>

            <Text style={styles.description}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    location: {
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#444',
    },
    touchableStyle: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
});

export default EventsDisplayCard;
