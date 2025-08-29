import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { colors } from '../../../../theme/colors';
import formatFirebaseDate from '../../../../functions/formatFirebaseDate';
import formatFirebaseTime from '../../../../functions/formatFirebaseTime';

type EventsDetailRouteProp = RouteProp<
    HomeNavigationParamList,
    'Upcoming Events Details'
>;

interface EventsDetailProps {
    route: EventsDetailRouteProp;
}

const UpcomingEventsDetails: React.FC<EventsDetailProps> = ({ route }) => {
    const { item } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.infoRow}>
                <FontAwesome
                    name="calendar"
                    size={18}
                    color={colors.petrolBlue}
                    style={styles.icon}
                />
                <Text style={styles.infoText}>
                    {formatFirebaseDate(item.date)}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <FontAwesome
                    name="clock-o"
                    size={18}
                    color={colors.petrolBlue}
                    style={styles.icon}
                />
                <Text style={styles.infoText}>
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
                    <Text style={styles.infoText}>{item.location}</Text>
                </View>
            )}

            {item.details && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <Text style={styles.sectionContent}>{item.details}</Text>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <Text style={styles.sectionContent}>
                    For any questions, please contact{' '}
                    <Text style={styles.contactName}>{item.contact}</Text>.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 8,
    },
    infoText: {
        fontSize: 16,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.petrolBlue,
        marginBottom: 6,
    },
    sectionContent: {
        fontSize: 16,
        lineHeight: 22,
    },
    contactName: {
        fontWeight: '700',
        color: colors.orange,
    },
});

export default UpcomingEventsDetails;
