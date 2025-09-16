import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { IEvent } from '../../../../interfaces/IEvent';
import formatFirebaseDate from '../../../../functions/database/formatFirebaseDate';
import formatFirebaseTime from '../../../../functions/formatFirebaseTime';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events Details'
>;

function EventsDisplayCard(props: IEvent) {
    const navigation = useNavigation<NavigationProps>();

    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const handlePress = () => {
        navigation.navigate('Upcoming Events Details', { id: props.id }); // Pass the full event object to EventDetail
    };

    const dateTimeStyle = generateStyle('fontS', 'secondary');
    const titleStyle = generateStyle('fontL', 'weight700', 'primary');
    const descriptionStyle = generateStyle('fontS');
    const locationStyle = generateStyle('fontS', 'secondary');

    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View style={styles.dateTimeContainer}>
                    <FontAwesome
                        name="calendar"
                        size={14}
                        color={colorMap.primary}
                    />
                    <Text style={dateTimeStyle}>
                        {formatFirebaseDate(props.date)}
                    </Text>
                </View>

                <View style={styles.timeView}>
                    <FontAwesome
                        name="clock-o"
                        size={14}
                        color={colorMap.primary}
                    />
                    <Text style={dateTimeStyle}>
                        {formatFirebaseTime(props.date)}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={handlePress}
                style={styles.touchableStyle}
            >
                <Text style={titleStyle}>{props.title}</Text>
                <FontAwesome
                    name="chevron-right"
                    size={20}
                    color={colorMap.primary}
                />
            </TouchableOpacity>

            <Text style={descriptionStyle}>{props.text}</Text>

            {props.location && (
                <View style={styles.locationRow}>
                    <FontAwesome
                        name="map-pin"
                        size={14}
                        color={colorMap.third}
                    />
                    <Text style={locationStyle}>{props.location}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 6,
    },
    dateTimeContainer: { flexDirection: 'row', gap: 6 },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingLeft: 10,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 6,
    },
    touchableStyle: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingBottom: 6,
    },
});

export default EventsDisplayCard;
