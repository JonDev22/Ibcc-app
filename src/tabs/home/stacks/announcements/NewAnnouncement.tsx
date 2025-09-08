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

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import { IAnnouncement } from '../../../../interfaces/IAnnouncement';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';
import resourcesStorage from '../../../../storage/resourcesStorage';

type NewAnnouncementProps = {
    navigation: NativeStackNavigationProp<any>;
};

function NewAnnouncement({ navigation }: NewAnnouncementProps) {
    const generateStyle = useStyle();

    const { addAnnouncement } = resourcesStorage();

    const [title, setTitle] = useState('');
    const [disclaimer, setDisclaimer] = useState('');
    const [detail, setDetail] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = () => {
        if (!title || !disclaimer || !detail || !contact) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields.',
            );
            return;
        }

        const newAnnouncement: Omit<IAnnouncement, 'id'> = {
            title,
            date: Timestamp.fromDate(new Date()),
            disclaimer,
            detail,
            contact,
        };

        addItemToDatabase(newAnnouncement, 'announcements').then(res => {
            if (res.status === 'success' && res.id) {
                addAnnouncement({ ...newAnnouncement, id: res.id });
                navigation.goBack();
            } else {
                Alert.alert(res.message ?? 'Could not create announcement...');
            }
        });
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

                <Text style={textStyle}>Disclaimer *</Text>
                <TextInput
                    style={inputStyle}
                    value={disclaimer}
                    onChangeText={setDisclaimer}
                />
                <Spacer />

                <Text style={textStyle}>Detail *</Text>
                <TextInput
                    style={[inputStyle, styles.multiline]}
                    value={detail}
                    onChangeText={setDetail}
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
                        <Text style={textStyle}>Add Announcement</Text>
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

export default NewAnnouncement;
