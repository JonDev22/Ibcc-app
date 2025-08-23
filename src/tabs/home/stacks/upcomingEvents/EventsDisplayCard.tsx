import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { IEvent } from '../../../../interfaces/IEvent';
import formatFirebaseDate from '../../../../functions/formatFirebaseDate';
import formatFirebaseTime from '../../../../functions/formatFirebaseTime';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events Details'
>;

function EventsDisplayCard(props: IEvent) {
    const navigation = useNavigation<NavigationProps>();

    const handlePress = () => {
        navigation.navigate('Upcoming Events Details', { item: props }); // Pass the full event object to EventDetail
    };

    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <FontAwesome
                    name="calendar"
                    size={14}
                    color={colors.petrolBlue}
                />
                <Text style={styles.datetime}>
                    {formatFirebaseDate(props.date)}
                </Text>
                <View style={styles.timeView}>
                    <FontAwesome
                        name="clock-o"
                        size={14}
                        color={colors.petrolBlue}
                    />
                    <Text style={styles.datetime}>
                        {formatFirebaseTime(props.date)}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={handlePress}
                style={styles.touchableStyle}
            >
                <Text style={styles.title}>{props.title}</Text>
                <FontAwesome
                    name="chevron-right"
                    size={20}
                    color={colors.petrolBlue}
                />
            </TouchableOpacity>

            <Text style={styles.description}>{props.text}</Text>

            {props.location && (
                <View style={styles.locationRow}>
                    <FontAwesome
                        name="map-pin"
                        size={14}
                        color={colors.orange}
                    />
                    <Text style={styles.location}>{props.location}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
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
    datetime: {
        fontSize: 14,
        color: colors.lightPetrolBlue,
        marginLeft: 4,
    },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    location: {
        fontSize: 14,
        color: colors.lightPetrolBlue,
        marginLeft: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.petrolBlue,
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
    },
    touchableStyle: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
});

export default EventsDisplayCard;
