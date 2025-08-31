// AnnouncementList.tsx
import FontAwesome from '@react-native-vector-icons/fontawesome';
import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { IAnnouncement } from '../../../../interfaces/IAnnouncement';
import { Timestamp } from '@react-native-firebase/firestore';
import Separator from '../../../../functions/Separator';
import { colors } from '../../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../types/homeNavigationProp';
import { HomeNavigationParamList } from '../../types/navigationTypes';

function Announcements() {
    const navigation =
        useNavigation<HomeNavigationType<'Announcements Details'>>();

    const renderItem = ({ item }: { item: IAnnouncement }) => {
        const formattedDate = item.date.toDate().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate('Announcements Details', {
                        announcement: item,
                    })
                }
            >
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name="info-circle"
                            size={22}
                            color="#007BFF"
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                        <Text style={styles.disclaimer}>{item.disclaimer}</Text>
                    </View>
                </View>
                <FontAwesome
                    name="chevron-right"
                    size={20}
                    color="#888"
                    style={styles.chevron}
                />
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={ann}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={Separator}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.petrolBlue,
    },
    date: {
        fontSize: 13,
        color: colors.orange,
        marginTop: 4,
    },
    disclaimer: {
        fontSize: 14,
        color: colors.lightPetrolBlue,
        marginTop: 6,
    },
    chevron: {
        marginLeft: 10,
    },
});

export default Announcements;

const ann = [
    {
        id: '1',
        title: 'System Maintenance Scheduled',
        disclaimer: 'Service interruptions may occur.',
        detail: 'Our servers will undergo maintenance on Sept 2 from 01:00 to 03:00 CET. Please save your work.',
        contact: 'support@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-09-01T10:00:00')),
    },
    {
        id: '2',
        title: 'New Feature: Dark Mode',
        disclaimer: 'Available on iOS and Android.',
        detail: 'We’ve launched Dark Mode for better night-time usability. Update your app to try it out.',
        contact: 'features@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-30T14:30:00')),
    },
    {
        id: '3',
        title: 'Welcome Our New Developer',
        disclaimer: 'Say hi to Alex!',
        detail: 'Alex joins our mobile team with a focus on performance optimization and UI enhancements.',
        contact: 'team@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-28T09:00:00')),
    },
    {
        id: '4',
        title: 'Security Update Released',
        disclaimer: 'Critical patch applied.',
        detail: 'Version 3.2.1 includes important security fixes. Please update immediately.',
        contact: 'security@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-27T16:45:00')),
    },
    {
        id: '5',
        title: 'Community Meetup in Berlin',
        disclaimer: 'Limited seats available.',
        detail: 'Join us for a casual meetup with the dev team on Sept 10. RSVP required.',
        contact: 'events@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-26T11:15:00')),
    },
    {
        id: '6',
        title: 'Bug Fixes in Chat Module',
        disclaimer: 'Resolved message duplication issue.',
        detail: 'We’ve fixed several bugs in the chat module. Let us know if you spot anything else.',
        contact: 'bugs@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-25T13:00:00')),
    },
    {
        id: '7',
        title: 'Holiday Support Hours',
        disclaimer: 'Reduced availability during holidays.',
        detail: 'Support will be limited from Sept 5–7 due to regional holidays. Expect slower response times.',
        contact: 'support@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-24T08:30:00')),
    },
    {
        id: '8',
        title: 'New Blog Post: UX Trends 2025',
        disclaimer: 'Insights from our design team.',
        detail: 'Check out our latest blog post on emerging UX patterns and how we’re adapting.',
        contact: 'blog@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-23T17:20:00')),
    },
    {
        id: '9',
        title: 'App Performance Boost',
        disclaimer: 'Up to 40% faster load times.',
        detail: 'We’ve optimized backend calls and reduced startup latency. Enjoy the speed!',
        contact: 'performance@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-22T12:00:00')),
    },
    {
        id: '10',
        title: 'Feedback Survey Open',
        disclaimer: 'Help shape the future of our app.',
        detail: 'Take our 2-minute survey and tell us what you love—or what you’d change.',
        contact: 'feedback@yourapp.com',
        date: Timestamp.fromDate(new Date('2025-08-21T15:45:00')),
    },
];
