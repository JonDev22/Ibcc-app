import React, { use } from 'react';
import { View, FlatList } from 'react-native';
import EventsDisplayCard from './EventsDisplayCard';
import Separator from '../../../../functions/Separator';
import { ResourceContext } from '../../../../contexts/ResourceContext';
import useStyle from '../../../../hooks/useStyle';

function UpcomingEventsList() {
    const { events } = use(ResourceContext);

    const generateStyle = useStyle();

    const containerStyle = generateStyle(
        'hMinMax',
        'hPadding3XL',
        'wPadding3XL',
        'flex',
    );

    return (
        <View style={containerStyle}>
            <FlatList
                data={events}
                keyExtractor={item => item.date.toDate().toDateString()}
                renderItem={({ item }) => <EventsDisplayCard {...item} />}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
}

export default UpcomingEventsList;
