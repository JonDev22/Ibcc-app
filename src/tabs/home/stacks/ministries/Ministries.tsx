import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { colors } from '../../../../theme/colors';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export type Ministry = {
    id: string;
    name: string;
    leader: string;
    mainTask: string;
    description: string;
    vision: string;
    icon: any;
};

const ministries: Ministry[] = [
    {
        id: '1',
        name: 'Homeless Ministry',
        leader: 'John Doe',
        mainTask: 'Community outreach and evangelism',
        description:
            'Serving the community through missions, charity events, and spreading the word.',
        vision: 'To touch every life in the city with love and compassion.',
        icon: 'comments',
    },
    {
        id: '2',
        name: 'Hosting Ministry',
        leader: 'Mary Smith',
        mainTask: 'Biblical teaching and discipleship',
        description:
            'Organizing courses, Bible studies, and mentorship programs.',
        vision: 'To build strong disciples grounded in the Word of God.',
        icon: 'coffee',
    },
    {
        id: '3',
        name: 'Media Ministry',
        leader: 'David Johnson',
        mainTask: 'Leading worship and creative arts',
        description:
            'Responsible for music, choirs, and creative worship experiences.',
        vision: 'To inspire heartfelt worship that glorifies God.',
        icon: 'headphones',
    },
    {
        id: '4',
        name: 'Music Ministry',
        leader: 'Sarah Williams',
        mainTask: 'Prayer and intercession',
        description:
            'Hosting prayer meetings and covering church needs in prayer.',
        vision: 'To cultivate a praying church that seeks God’s presence.',
        icon: 'music',
    },
];

const MinistryListItem: React.FC<{ ministry: Ministry }> = ({ ministry }) => {
    return (
        <View style={styles.card}>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
                <FontAwesome
                    name={ministry.icon}
                    size={28}
                    color={colors.petrolBlue}
                    style={{ marginBottom: 8 }}
                />
                <Text style={styles.title}>{ministry.name}</Text>
            </View>
            <Text style={styles.subtitle}>Leader: {ministry.leader}</Text>
            <Text style={styles.text}>Task: {ministry.mainTask}</Text>
            <Text style={styles.text}>{ministry.description}</Text>
            <Text style={styles.vision}>Vision: {ministry.vision}</Text>
        </View>
    );
};

const MinistryList: React.FC = () => {
    return (
        <FlatList
            data={ministries}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MinistryListItem ministry={item} />}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default MinistryList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.petrolBlue,
    },
    title: {
        fontSize: 18,
        color: colors.petrolBlue,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    text: {
        fontSize: 13,
        marginBottom: 2,
    },
    vision: {
        fontSize: 13,
        fontStyle: 'italic',
        marginTop: 4,
    },
});
