import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { colors } from '../../../../theme/colors';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';

type AnnouncementDetailRouteProps = RouteProp<
    HomeNavigationParamList,
    'Announcements Details'
>;

interface AnnouncementDetailProps {
    route: AnnouncementDetailRouteProps;
}

function AnnouncementDetail({ route }: AnnouncementDetailProps) {
    const { announcement } = route.params;

    const generateStyle = useStyle();

    const formattedDate = announcement.date
        .toDate()
        .toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const containerView = generateStyle('hMinMax');
    const scrollViewStyle = generateStyle(
        'hMinMax',
        'hPadding3XL',
        'wPadding3XL',
        'hMarginXL',
        'wMarginXL',
    );
    const titleStyle = generateStyle('font2XL', 'weight700', 'primary');
    const dateStyle = generateStyle('fontS', 'third');
    const disclaimerStyle = generateStyle('fontM', 'secondary', 'italic');
    const sectionTitleStyle = generateStyle('fontM', 'weight600');
    const sectionTextStyle = generateStyle('fontS');

    return (
        <View style={containerView}>
            <ScrollView contentContainerStyle={scrollViewStyle}>
                <Text style={titleStyle}>{announcement.title}</Text>
                <Spacer />

                <Text style={dateStyle}>{formattedDate}</Text>
                <Spacer />

                <Text style={disclaimerStyle}>{announcement.disclaimer}</Text>
                <Spacer />

                <View style={styles.section}>
                    <Text style={sectionTitleStyle}>Details</Text>
                    <Text style={sectionTextStyle}>{announcement.detail}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={sectionTitleStyle}>Contact</Text>
                    <Text style={sectionTextStyle}>
                        For any questions, please contact{' '}
                        <Text style={styles.contactName}>
                            {announcement.contact}
                        </Text>
                        .
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default AnnouncementDetail;

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
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
