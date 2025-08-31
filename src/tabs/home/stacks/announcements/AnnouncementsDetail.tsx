import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { colors } from '../../../../theme/colors';

type AnnouncementDetailRouteProps = RouteProp<
    HomeNavigationParamList,
    'Announcements Details'
>;

interface AnnouncementDetailProps {
    route: AnnouncementDetailRouteProps;
}

function AnnouncementDetail({ route }: AnnouncementDetailProps) {
    const { announcement } = route.params;

    const formattedDate = announcement.date
        .toDate()
        .toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{announcement.title}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.disclaimer}>{announcement.disclaimer}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details</Text>
                <Text style={styles.sectionText}>{announcement.detail}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <Text style={styles.sectionText}>
                    For any questions, please contact: {announcement.contact}
                </Text>
            </View>
        </ScrollView>
    );
}

export default AnnouncementDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.petrolBlue,
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: colors.orange,
        marginBottom: 12,
    },
    disclaimer: {
        fontSize: 15,
        color: colors.lightPetrolBlue,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    sectionText: {
        fontSize: 15,
        lineHeight: 22,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
});
