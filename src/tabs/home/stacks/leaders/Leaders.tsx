import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { colors } from '../../../../theme/colors';
import Separator from '../../../../functions/Separator';

export type Leader = {
    id: number;
    name: string;
    ministry?: string;
    type: 'Elder' | 'Deacon' | 'Ministry Leader';
};

const leaders: Leader[] = [
    { id: 1, name: 'Werner', ministry: 'Music', type: 'Ministry Leader' },
    { id: 2, name: 'Dieter', ministry: 'Homeless', type: 'Ministry Leader' },
    { id: 3, name: 'Frank', ministry: 'Fiances', type: 'Deacon' },
    { id: 10, name: 'Gerhard', ministry: 'Chair', type: 'Deacon' },
    { id: 4, name: 'Reiner', ministry: 'Secretary', type: 'Deacon' },
    { id: 5, name: 'Bernd das Brot', type: 'Elder' },
    { id: 6, name: 'Zwerg Nase', type: 'Elder' },
    { id: 7, name: 'Hans Wurst', type: 'Elder' },
    { id: 8, name: 'Klaus Kinski', type: 'Ministry Leader' },
    { id: 9, name: 'Günther Jauch', type: 'Ministry Leader' },
];

const LeaderListItem: React.FC<{ leader: Leader }> = ({ leader }) => (
    <View style={styles.card}>
        <Text style={styles.subtitle}>{leader.name}</Text>
        {leader.ministry ? (
            <Text style={styles.text}>{leader.ministry}</Text>
        ) : (
            <Text style={styles.text}>{leader.type}</Text>
        )}
    </View>
);

const LeaderSection: React.FC<{ title: string; data: Leader[] }> = ({
    title,
    data,
}) => (
    <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <LeaderListItem leader={item} />}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
            ItemSeparatorComponent={Separator}
        />
    </View>
);

const Leaders: React.FC = () => {
    const elders = leaders.filter(leader => leader.type === 'Elder');
    const deacons = leaders.filter(leader => leader.type === 'Deacon');
    const ministryLeaders = leaders.filter(
        leader => leader.type === 'Ministry Leader',
    );

    return (
        <ScrollView>
            <LeaderSection title="See our faithful elders" data={elders} />
            <LeaderSection title="See our faithful deacons" data={deacons} />
            <LeaderSection
                title="See our faithful ministry leaders"
                data={ministryLeaders}
            />
        </ScrollView>
    );
};

export default Leaders;

const styles = StyleSheet.create({
    section: {
        marginBottom: 16,
    },
    listContainer: {
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    card: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        color: colors.petrolBlue,
        fontWeight: '700',
        marginBottom: 6,
        paddingLeft: 12,
        paddingTop: 12,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    text: {
        fontSize: 13,
    },
});
