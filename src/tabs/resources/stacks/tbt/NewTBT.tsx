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
import { pick, DocumentPickerResponse } from '@react-native-documents/picker';
import uploadTbtAtHomeFile from '../../../../functions/database/uploadTbtAtHomeFile';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';
import { ITbtResource } from '../../../../interfaces/ITbtResource';
import ResourceTypeModal from './ResourceTypeModal';
import useColorMap from '../../../../hooks/useColorMap';
import AddButton from '../../../../components/AddButton';

type NewEventProps = {
    navigation: NativeStackNavigationProp<any>;
};

function NewTbt({ navigation }: NewEventProps) {
    // const { tbtAtHome } = route.params;
    const generateStyle = useStyle();
    const colors = useColorMap();

    const { addTbtResource } = resourcesStorage();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [resource, setResource] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse>();
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!title || !text || !resource || !selectedIcon) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields.',
            );
            return;
        }

        if (!selectedFile) {
            Alert.alert('No file selected', 'Please select a PDF file.');
        } else {
            try {
                uploadTbtAtHomeFile(selectedFile, resource).then(res => {
                    if (res) {
                        console.log(res);
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
                                        resp.message ??
                                            'Could not add Tbt@Home...',
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
            } catch (error) {
                Alert.alert(
                    'Upload Failed',
                    'An unknown error occurred. Please try again later.',
                );
                console.log(error);
            }
        }
    };

    const container = generateStyle('hMinMax');
    const textStyle = generateStyle('fontS', 'pb3');
    const inputStyle = generateStyle(
        'border1',
        'wPaddingL',
        'hPaddingL',
        'borderPrimary',
        'hMarginS',
        'fontS',
        'rounded2',
    );

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
                <View style={styles.flexView}>
                    <Text style={textStyle}>
                        {selectedIcon ?? 'Select type...'}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setOpenModal(true)}
                        style={{
                            ...styles.pickerStyle,
                            borderColor: colors.third,
                        }}
                    >
                        <Text style={textStyle}>Change Type...</Text>
                    </TouchableOpacity>
                </View>

                <ResourceTypeModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    setValue={(value: string) => setSelectedIcon(value)}
                />

                <Spacer />
                <Spacer />

                <AddButton
                    handleAddEvent={handleSubmit}
                    buttonLabel="Add TBT@Home Resource"
                />
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
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    pickerStyle: {
        borderWidth: 1,
        borderRadius: 8,
        paddingTop: 6,
        paddingBottom: 2,
        paddingHorizontal: 20,
        textAlign: 'center',
        alignContent: 'center',
    },
});

export default NewTbt;
