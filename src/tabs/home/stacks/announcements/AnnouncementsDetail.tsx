import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { colors } from '../../../../theme/colors';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import deleteItem from '../../../../functions/database/deleteItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import resourcesStorage from '../../../../storage/resourcesStorage';
import userSettings from '../../../../storage/userSettings';

type AnnouncementDetailRouteProps = RouteProp<
    HomeNavigationParamList,
    'Announcements Details'
>;

interface AnnouncementDetailProps {
    route: AnnouncementDetailRouteProps;
    navigation: NativeStackNavigationProp<any>;
}

function AnnouncementDetail({ route, navigation }: AnnouncementDetailProps) {
    const { announcement } = route.params;

    const { removeAnnouncement } = resourcesStorage();
    const { user } = userSettings();

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
    const toggleStyle = generateStyle(
        'border1',
        'borderPrimary',
        'rounded2',
        'hPaddingXL',
        'wPaddingXL',
    );

    const handleEdit = () => {
        navigation.navigate('New Announcement', { announcement });
    };

    const handleDeleteAnnouncement = () => {
        deleteItem(announcement, 'announcements').then(res => {
            if (res === 'success') {
                removeAnnouncement(announcement);
                navigation.goBack();
            } else {
                Alert.alert(res);
            }
        });
    };

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

                {user && (
                    <>
                        <Spacer />

                        <TouchableOpacity
                            onPress={handleEdit}
                            style={toggleStyle}
                        >
                            <Text style={{ color: colors.slateBlue }}>
                                Edit Event
                            </Text>
                        </TouchableOpacity>

                        <Spacer />

                        <TouchableOpacity
                            onPress={handleDeleteAnnouncement}
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
