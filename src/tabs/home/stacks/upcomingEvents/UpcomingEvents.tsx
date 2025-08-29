import React, { use } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import EventsDisplayCard from './EventsDisplayCard';
import Separator from '../../../../functions/Separator';
import { ResourceContext } from '../../../../contexts/ResourceContext';

function UpcomingEventsList() {
    const { events } = use(ResourceContext);

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={item => item.date.toDate().toDateString()}
                renderItem={({ item }) => <EventsDisplayCard {...item} />}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
});

export default UpcomingEventsList;
