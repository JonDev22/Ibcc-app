import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { colors } from '../../../../theme/colors';
import formatFirebaseDate from '../../../../functions/database/formatFirebaseDate';
import formatFirebaseTime from '../../../../functions/formatFirebaseTime';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';
import Spacer from '../../../../components/Spacer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import deleteItem from '../../../../functions/database/deleteItem';
import resourcesStorage from '../../../../storage/resourcesStorage';
import userSettings from '../../../../storage/userSettings';

type EventsDetailRouteProp = RouteProp<
    HomeNavigationParamList,
    'Upcoming Events Details'
>;

interface EventsDetailProps {
    route: EventsDetailRouteProp;
    navigation: NativeStackNavigationProp<any>;
}

function UpcomingEventsDetails({ route, navigation }: EventsDetailProps) {
    const { item } = route.params;

    const { removeEvent } = resourcesStorage();
    const { user } = userSettings();

    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const containerStyle = generateStyle('hMinMax');
    const headerStyle = generateStyle('fontXL', 'weight700');
    const infoTextStyle = generateStyle('fontS');
    const sectionContentStyle = generateStyle('fontXS', 'textLine20');
    const sectionTitleStyle = generateStyle('fontL', 'weight600', 'primary');
    const toggleStyle = generateStyle(
        'border1',
        'borderPrimary',
        'rounded2',
        'hPaddingXL',
        'wPaddingXL',
    );

    const handleDeleteEvent = () => {
        deleteItem(item, 'events').then(res => {
            if (res === 'success') {
                removeEvent(item);
                navigation.goBack();
            } else {
                Alert.alert(res);
            }
        });
    };

    const handleEditEvent = () => {
        navigation.navigate('New Event', { event: item });
    };

    return (
        <View style={containerStyle}>
            <ScrollView style={styles.container}>
                <Text style={headerStyle}>{item.title}</Text>
                <Spacer />
                <Spacer />

                <View style={styles.infoRow}>
                    <FontAwesome
                        name="calendar"
                        size={18}
                        color={colorMap.primary}
                        style={styles.icon}
                    />
                    <Text style={infoTextStyle}>
                        {formatFirebaseDate(item.date)}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <FontAwesome
                        name="clock-o"
                        size={18}
                        color={colorMap.primary}
                        style={styles.icon}
                    />
                    <Text style={infoTextStyle}>
                        {formatFirebaseTime(item.date)}
                    </Text>
                </View>

                {item.location && (
                    <View style={styles.infoRow}>
                        <FontAwesome
                            name="map-pin"
                            size={18}
                            color={colors.orange}
                            style={styles.icon}
                        />
                        <Text style={infoTextStyle}>{item.location}</Text>
                    </View>
                )}

                {item.text && (
                    <View>
                        <Spacer />
                        <Text style={sectionContentStyle}>{item.text}</Text>
                    </View>
                )}

                {item.details && (
                    <View>
                        <Spacer />
                        <Text style={sectionTitleStyle}>Details</Text>
                        <Spacer />
                        <Text style={sectionContentStyle}>{item.details}</Text>
                    </View>
                )}

                <View>
                    <Spacer />
                    <Text style={sectionTitleStyle}>Contact</Text>
                    <Spacer />
                    <Text style={sectionContentStyle}>
                        For any questions, please contact{' '}
                        <Text style={styles.contactName}>{item.contact}</Text>
                    </Text>
                </View>

                {user && (
                    <>
                        <Spacer />
                        <TouchableOpacity
                            onPress={handleEditEvent}
                            style={toggleStyle}
                        >
                            <Text style={{ color: colors.slateBlue }}>
                                Edit Event
                            </Text>
                        </TouchableOpacity>

                        <Spacer />
                        <TouchableOpacity
                            onPress={handleDeleteEvent}
                            style={toggleStyle}
                        >
                            <Text style={{ color: colors.orange }}>
                                Delete Event
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 8,
    },
    contactName: {
        fontWeight: '700',
        color: colors.orange,
    },
});

export default UpcomingEventsDetails;
