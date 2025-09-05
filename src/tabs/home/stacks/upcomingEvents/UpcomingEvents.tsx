import React, { use } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import EventsDisplayCard from './EventsDisplayCard';
import Separator from '../../../../functions/Separator';
import { ResourceContext } from '../../../../contexts/ResourceContext';
import useStyle from '../../../../hooks/useStyle';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../types/homeNavigationProp';

function UpcomingEventsList() {
    const { events, user } = use(ResourceContext);
    const navigation = useNavigation<HomeNavigationType<'New Event'>>();

    const generateStyle = useStyle();

    const containerStyle = generateStyle(
        'hMinMax',
        'hPadding3XL',
        'wPadding3XL',
        'flex',
    );

    const handleAddEvent = () => {
        navigation.navigate('New Event');
    };

    return (
        <View style={containerStyle}>
            <FlatList
                data={events}
                keyExtractor={item => item.date.toDate().toDateString()}
                renderItem={({ item }) => <EventsDisplayCard {...item} />}
                ItemSeparatorComponent={Separator}
            />

            {user && (
                <TouchableOpacity style={styles.fab} onPress={handleAddEvent}>
                    <Text>+</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default UpcomingEventsList;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: 'red',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
