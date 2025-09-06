import React, { use, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
    Modal,
    Platform,
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timestamp } from '@react-native-firebase/firestore';
import { IEvent } from '../../../../interfaces/IEvent';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import addEventToDatabase from '../../../../functions/addEventToDatabase';
import formatFirebaseDate from '../../../../functions/formatFirebaseDate';
import formatFirebaseTime from '../../../../functions/formatFirebaseTime';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import { ResourceContext } from '../../../../contexts/ResourceContext';

type NewEventProps = {
    navigation: NativeStackNavigationProp<any>;
};

function NewEvent({ navigation }: NewEventProps) {
    const generateStyle = useStyle();

    const { addEvent } = use(ResourceContext);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState<Timestamp>(Timestamp.fromDate(new Date()));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = () => {
        if (!title || !location || !text || !date) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields.',
            );
            return;
        }

        const newEvent: Omit<IEvent, 'id'> = {
            title,
            date,
            text,
            location,
            details: details || undefined,
            contact: contact || undefined,
        };

        addEventToDatabase(newEvent).then(res => {
            if (res.status === 'success' && res.id) {
                addEvent({ ...newEvent, id: res.id });
                navigation.goBack();
            } else {
                Alert.alert(res.message ?? 'Could not create event...');
            }
        });
    };

    const container = generateStyle('hMinMax');
    const textStyle = generateStyle('fontS');
    const dateTextStyle = generateStyle('fontS', 'secondary');
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
    const modalViewContent = generateStyle(
        'wPaddingXL',
        'hPaddingXL',
        'wMarginXL',
        'hMarginXL',
        'rounded2',
        'selfCenter',
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

                <Text style={textStyle}>Date *</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={dateTextStyle}>{`${formatFirebaseDate(
                        date,
                    )}; ${formatFirebaseTime(date)}`}</Text>
                </TouchableOpacity>
                {/* {showDatePicker && ( */}
                <Modal
                    visible={showDatePicker}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalViewContainer}>
                        <View style={modalViewContent}>
                            <DateTimePicker
                                value={date.toDate()}
                                mode="datetime"
                                display={
                                    Platform.OS === 'ios' ? 'inline' : 'default'
                                }
                                onChange={(_, selectedDate) => {
                                    if (selectedDate)
                                        setDate(
                                            Timestamp.fromDate(selectedDate),
                                        );
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(false)}
                                style={addButtonStyle}
                            >
                                <Text style={textStyle}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                        <Text style={textStyle}>Add Event</Text>
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
