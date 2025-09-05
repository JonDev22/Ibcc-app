import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
    Modal,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timestamp } from '@react-native-firebase/firestore';
import { IEvent } from '../../../../interfaces/IEvent';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import addEventToDatabase from '../../../../functions/addEventToDatabase';

type NewEventProps = {
    navigation: NativeStackNavigationProp<any>;
};

function NewEvent({ navigation }: NewEventProps) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = () => {
        if (!title || !location || !text) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields.',
            );
            return;
        }

        const newEvent: IEvent = {
            id: 'uuid.v4().toString()',
            title,
            date: Timestamp.fromDate(date),
            text,
            location,
            details: details || undefined,
            contact: contact || undefined,
        };

        // TODO: Save to Firestore or context
        const retVal = addEventToDatabase(newEvent);
        console.log('A');
        console.log(retVal);

        navigation.goBack(); // or navigate to event list
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Date *</Text>
            <Button
                title={`${date.toDateString()} ${date.toTimeString()}`}
                onPress={() => setShowDatePicker(true)}
            />
            {/* {showDatePicker && ( */}
            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalViewContainer}>
                    <View style={styles.modalViewContent}>
                        <DateTimePicker
                            value={date}
                            mode="datetime"
                            display={
                                Platform.OS === 'ios' ? 'inline' : 'default'
                            }
                            onChange={(_, selectedDate) => {
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                        <Button
                            title="OK"
                            onPress={() => setShowDatePicker(false)}
                        />
                    </View>
                </View>
            </Modal>
            {/* )} */}

            <Text style={styles.label}>Location *</Text>
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
            />

            <Text style={styles.label}>Text *</Text>
            <TextInput
                style={[styles.input, styles.multiline]}
                value={text}
                onChangeText={setText}
                multiline
            />

            <Text style={styles.label}>Details</Text>
            <TextInput
                style={[styles.input, styles.multiline]}
                value={details}
                onChangeText={setDetails}
                multiline
            />

            <Text style={styles.label}>Contact</Text>
            <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
            />

            <View style={styles.buttonContainer}>
                <Button title="Add Event" onPress={handleSubmit} />
            </View>
        </ScrollView>
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        marginTop: 5,
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
    modalViewContent: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 10,
        padding: 20,
    },
});

export default NewEvent;
