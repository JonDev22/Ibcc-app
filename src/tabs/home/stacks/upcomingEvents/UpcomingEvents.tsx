import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import EventsDisplayCard from './EventsDisplayCard';
import Separator from '../../../../functions/Separator';
import useStyle from '../../../../hooks/useStyle';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../types/homeNavigationProp';
import useColorMap from '../../../../hooks/useColorMap';
import resourcesStorage from '../../../../storage/resourcesStorage';
import userSettings from '../../../../storage/userSettings';
import AddButton from '../../../../components/AddButton';
import hasUserRole from '../../../../functions/hasUserRole';
import Spacer from '../../../../components/Spacer';

function UpcomingEventsList() {
    const { events } = resourcesStorage();
    const { user } = userSettings();
    const navigation = useNavigation<HomeNavigationType<'New Event'>>();

    const colorMap = useColorMap();

    const generateStyle = useStyle();

    const containerStyle = generateStyle(
        'hMinMax',
        'hPadding3XL',
        'wPadding3XL',
        'flex',
    );

    const handleAddEvent = () => {
        navigation.navigate('New Event', {});
    };

    return (
        <View style={containerStyle}>
            <ScrollView>
                <FlatList
                    data={events}
                    keyExtractor={item =>
                        `${item.date.toDate().toDateString()}; ${item.title}; ${
                            item.id
                        }`
                    }
                    renderItem={({ item }) => <EventsDisplayCard {...item} />}
                    ItemSeparatorComponent={Separator}
                    scrollEnabled={false}
                />

                {hasUserRole(user, ['admin']) && (
                    <View>
                        <Spacer />
                        <AddButton
                            handleAddEvent={handleAddEvent}
                            buttonLabel="Add Event"
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

export default UpcomingEventsList;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
