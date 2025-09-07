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
import { use } from 'react';
import { ResourceContext } from '../../../../../contexts/ResourceContext';
import formatFirebaseDate from '../../../../../functions/database/formatFirebaseDate';
import formatFirebaseTime from '../../../../../functions/formatFirebaseTime';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events'
>;

function TopUpcomingEvents() {
    const navigation = useNavigation<NavigationProps>();

    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const headerStyle = generateStyle('bold', 'fontXL');
    const titleStyle = generateStyle('weight600', 'fontL');
    const descriptionStyle = generateStyle('fontXS');
    const locationStyle = generateStyle('fontXS', 'secondary');

    const { events } = use(ResourceContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Upcoming Events')}
            >
                <View style={styles.header}>
                    <FontAwesome
                        name="calendar"
                        size={24}
                        color={colorMap.primary}
                    />
                    <Text style={headerStyle}>Upcoming Events</Text>
                    <FontAwesome
                        name="chevron-right"
                        size={16}
                        color={colorMap.primary}
                    />
                </View>
            </TouchableOpacity>

            <FlatList
                data={events.slice(0, 2)}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <FontAwesome
                                name="star"
                                size={16}
                                color={colors.orange}
                            />
                            <Text style={titleStyle}>{item.title}</Text>
                        </View>
                        <Text style={descriptionStyle}>
                            {formatFirebaseDate(item.date)}{' '}
                            {formatFirebaseTime(item.date)}
                        </Text>
                        {item.details && (
                            <Text style={descriptionStyle}>{item.text}</Text>
                        )}
                        <View style={styles.locationRow}>
                            <FontAwesome
                                name="map-pin"
                                size={14}
                                color={colors.orange}
                            />
                            <Text style={locationStyle}>{item.location}</Text>
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
    card: {
        borderRadius: 12,
        padding: 16,
        gap: 4,
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
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});
