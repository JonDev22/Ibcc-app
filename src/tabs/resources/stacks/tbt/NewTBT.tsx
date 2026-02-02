import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Timestamp } from '@react-native-firebase/firestore';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import resourcesStorage from '../../../../storage/resourcesStorage';
import { colors } from '../../../../theme/colors';
import { pick, DocumentPickerResponse } from '@react-native-documents/picker';
import uploadTbtAtHomeFile from '../../../../functions/database/uploadTbtAtHomeFile';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';
import { ITbtResource } from '../../../../interfaces/ITbtResource';
import { Picker } from '@react-native-picker/picker';
import { record } from '../../../../functions/getIconFromString';

type NewEventProps = {
    navigation: NativeStackNavigationProp<any>;
};

function NewTbt({ navigation }: NewEventProps) {
    // const { tbtAtHome } = route.params;
    const generateStyle = useStyle();

    const { addTbtResource } = resourcesStorage();

    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [resource, setResource] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse>();
    const [selectedIcon, setSelectedIcon] = useState<string>('');

    const handleSubmit = () => {
        if (!title || !text || !resource) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields.',
            );
            return;
        }

        if (!selectedFile) {
            Alert.alert('No file selected', 'Please select a PDF file.');
        } else {
            uploadTbtAtHomeFile(selectedFile, resource).then(res => {
                if (res) {
                    const newTbtAtHome: Omit<ITbtResource, 'id'> = {
                        title,
                        text,
                        resourceType: selectedIcon,
                        resource: res,
                        date: Timestamp.now(),
                    };

                    addItemToDatabase(newTbtAtHome, 'tbtResources').then(
                        resp => {
                            if (resp.status === 'success' && resp.id) {
                                addTbtResource({
                                    ...newTbtAtHome,
                                    id: resp.id,
                                });
                                navigation.goBack();
                            } else {
                                Alert.alert(
                                    resp.message ?? 'Could not add Tbt@Home...',
                                );
                                // TODO: Delete uploaded file if database addition fails.
                            }
                        },
                    );
                } else {
                    Alert.alert(
                        'Upload Failed',
                        'There was an error uploading the file. Please try again.',
                    );
                }
            });
        }
    };

    const container = generateStyle('hMinMax');
    const textStyle = generateStyle('fontS', 'pb3');
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
    const pickerStyle = generateStyle(
        'border1',
        'wPaddingL',
        'hPaddingL',
        'borderPrimary',
        'hMarginS',
        'fontS',
        'rounded2',
    );
    const pickerItemStyle = generateStyle('fontS');

    const getPlatformSpecificType = () => {
        // iOS uses UTIs, Android uses MIME types
        if (Platform.OS === 'ios') {
            return { type: 'com.adobe.pdf' };
        } else {
            return { type: 'application/pdf' };
        }
    };

    return (
        <View style={container}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={textStyle}>Resource (PDF) *</Text>
                <TouchableOpacity
                    onPress={() => {
                        pick(getPlatformSpecificType())
                            .then(res => {
                                if (res && res.length > 0) {
                                    setSelectedFile(res[0]);
                                    setResource(
                                        res[0].name
                                            ? `tbt/${res[0].name}`
                                            : 'Error retrieving name',
                                    );
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    }}
                    style={inputStyle}
                >
                    <Text style={textStyle}>
                        {resource ? resource : 'Select PDF...'}
                    </Text>
                </TouchableOpacity>
                <Spacer />

                <Text style={textStyle}>Title *</Text>
                <TextInput
                    style={inputStyle}
                    value={title}
                    onChangeText={setTitle}
                />
                <Spacer />

                <Text style={textStyle}>Text *</Text>
                <TextInput
                    style={inputStyle}
                    value={text}
                    onChangeText={setText}
                />
                <Spacer />

                <Text style={textStyle}>Icon Type *</Text>
                <View style={pickerStyle}>
                    <Picker
                        selectedValue={selectedIcon}
                        onValueChange={setSelectedIcon}
                        itemStyle={pickerItemStyle}
                    >
                        {Object.entries(record).map(([key, value]) => (
                            <Picker.Item
                                label={key.toLocaleUpperCase()}
                                value={value}
                                key={key}
                            />
                        ))}
                    </Picker>
                </View>
                <Spacer />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={addButtonStyle}
                    >
                        <Text style={{ ...textStyle, color: colors.orange }}>
                            Add Event
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
    buttonContainer: {
        marginTop: 30,
    },
});

export default NewTbt;
