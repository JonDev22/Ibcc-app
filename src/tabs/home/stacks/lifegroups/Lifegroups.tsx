import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import Separator from '../../../../functions/Separator';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export type HomeGroup = {
    id: number;
    title: string;
    location: string;
    meetingTime: string;
    contact: string;
};

const homeGroups: HomeGroup[] = [
    {
        id: 1,
        title: 'Fridays Men`s Meeting',
        location: 'Bahnhofstraße 3',
        meetingTime: 'Fridays at 19:30',
        contact: 'Anna Müller',
    },
    {
        id: 2,
        title: 'Community Center Group',
        location: 'Community Center, Parkstraße 45',
        meetingTime: 'Fridays at 18:00',
        contact: 'Jonas Schmidt',
    },
    {
        id: 3,
        title: 'Manly Man Group',
        location: 'Online (Zoom)',
        meetingTime: 'Mondays at 20:00',
        contact: 'Lisa Becker',
    },
];

const LifeGroupItem: React.FC<{ group: HomeGroup }> = ({ group }) => (
    <View style={styles.card}>
        <Text style={styles.location}>{group.title}</Text>
        <View style={styles.view}>
            <FontAwesome name="map-pin" size={14} color={colors.orange} />
            <Text style={styles.text}>{group.location}</Text>
        </View>
        <View style={styles.view}>
            <FontAwesome name="calendar" size={14} color={colors.petrolBlue} />
            <Text style={styles.text}>{group.meetingTime}</Text>
        </View>
        <View style={styles.view}>
            <FontAwesome name="phone" size={14} color={colors.orchid} />
            <Text style={styles.text}>Contact: {group.contact}</Text>
        </View>
    </View>
);

const LifeGroupList: React.FC = () => (
    <FlatList
        data={homeGroups}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <LifeGroupItem group={item} />}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={Separator}
    />
);

export default LifeGroupList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
    card: {
        padding: 16,
        gap: 4,
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    location: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: colors.petrolBlue,
    },
    text: {
        fontSize: 14,
        marginTop: 2,
    },
    separator: {
        height: 12,
    },
});
