import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { colors } from '../../../../theme/colors';
import formatFirebaseDate from '../../../../functions/formatFirebaseDate';
import formatFirebaseTime from '../../../../functions/formatFirebaseTime';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';
import Spacer from '../../../../components/Spacer';

type EventsDetailRouteProp = RouteProp<
    HomeNavigationParamList,
    'Upcoming Events Details'
>;

interface EventsDetailProps {
    route: EventsDetailRouteProp;
}

function UpcomingEventsDetails({ route }: EventsDetailProps) {
    const { item } = route.params;

    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const containerStyle = generateStyle('hMinMax');
    const headerStyle = generateStyle('fontXL', 'weight700');
    const infoTextStyle = generateStyle('fontS');
    const sectionContentStyle = generateStyle('fontXS', 'textLine20');
    const sectionTitleStyle = generateStyle('fontL', 'weight600', 'primary');

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
