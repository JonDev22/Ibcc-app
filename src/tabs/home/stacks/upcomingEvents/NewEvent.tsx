import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
} from 'react-native';

import { Timestamp } from '@react-native-firebase/firestore';
import { IEvent } from '../../../../interfaces/IEvent';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import addEventToDatabase from '../../../../functions/database/addItemToDatabase';

import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import resourcesStorage from '../../../../storage/resourcesStorage';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigationParamList } from '../../types/navigationTypes';
import { colors } from '../../../../theme/colors';
import editItemInDatabase from '../../../../functions/database/editItemInDatabase';
import DateTimeComp from './DateTimeComp';

type EventsDetailRouteProps = RouteProp<HomeNavigationParamList, 'New Event'>;

type NewEventProps = {
    route: EventsDetailRouteProps;
    navigation: NativeStackNavigationProp<any>;
};

function NewEvent({ navigation, route }: NewEventProps) {
    const { event } = route.params;
    const generateStyle = useStyle();

    const { addEvent, editEvent } = resourcesStorage();

    const [title, setTitle] = useState<string>(event?.title ?? '');
    const [text, setText] = useState<string>(event?.text ?? '');
    const [location, setLocation] = useState<string>(event?.location ?? '');
    const [details, setDetails] = useState<string>(event?.details ?? '');
    const [contact, setContact] = useState<string>(event?.contact ?? '');
    const [date, setDate] = useState<Timestamp>(
        event?.date ?? Timestamp.fromDate(new Date()),
    );

    const handleSubmit = () => {
        if (!title || !location || !text || !date) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields.',
            );
            return;
        }

        if (event) {
            // Event exists, user wants to edit existing event.
            const newEvent: IEvent = {
                ...event,
                title,
                text,
                location,
                details,
                contact,
                date,
            };

            editItemInDatabase<IEvent>(newEvent, 'events').then(res => {
                if (res.status === 'success') {
                    editEvent(newEvent);
                    navigation.goBack();
                } else {
                    Alert.alert(res.message ?? 'Could not edit event...');
                }
            });
        } else {
            // Event is undefined, user wants to create a new event.

            const newEvent: Omit<IEvent, 'id'> = {
                title,
                date,
                text,
                location,
                details: details || undefined,
                contact: contact || undefined,
            };

            addEventToDatabase(newEvent, 'events').then(res => {
                if (res.status === 'success' && res.id) {
                    addEvent({ ...newEvent, id: res.id });
                    navigation.goBack();
                } else {
                    Alert.alert(res.message ?? 'Could not create event...');
                }
            });
        }
    };

    const container = generateStyle('hMinMax');
    const textStyle = generateStyle('fontS');
    const addButtonStyle = generateStyle(
        'border1',
        'borderPrimary',
        'rounded2',
        'wPaddingL',
        'hPaddingL',
    );
    const inputStyle = generateStyle(
        'border1',
        'wPaddingL',
        'hPaddingL',
        'borderPrimary',
        'hMarginS',
        'fontS',
        'rounded2',
    );

    return (
        <View style={container}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={textStyle}>Title *</Text>
                <TextInput
                    style={inputStyle}
                    value={title}
                    onChangeText={setTitle}
                />
                <Spacer />

                <DateTimeComp date={date} setDate={setDate} />
                <Spacer />

                <Text style={textStyle}>Location *</Text>
                <TextInput
                    style={inputStyle}
                    value={location}
                    onChangeText={setLocation}
                />
                <Spacer />

                <Text style={textStyle}>Text *</Text>
                <TextInput
                    style={[inputStyle, styles.multiline]}
                    value={text}
                    onChangeText={setText}
                    multiline
                />
                <Spacer />

                <Text style={textStyle}>Details</Text>
                <TextInput
                    style={[inputStyle, styles.multiline]}
                    value={details}
                    onChangeText={setDetails}
                    multiline
                />
                <Spacer />

                <Text style={textStyle}>Contact</Text>
                <TextInput
                    style={inputStyle}
                    value={contact}
                    onChangeText={setContact}
                />
                <Spacer />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={addButtonStyle}
                    >
                        <Text style={{ ...textStyle, color: colors.orange }}>
                            {event ? 'Edit' : 'Add'} Event
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginTop: 15,
        fontWeight: 'bold',
    },
    multiline: {
        height: 80,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 30,
    },
    modalViewContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000aa',
    },
});

export default NewEvent;
