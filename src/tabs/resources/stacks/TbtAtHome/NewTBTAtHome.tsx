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
import resourcesStorage from '../../../../storage/resourcesStorage';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../../../../theme/colors';
import { ResourceNavigationParamList } from '../../types/navigationTypes';
import { ITbtAtHome } from '../../../../interfaces/ITbtAtHome';
import { pick, DocumentPickerResponse } from '@react-native-documents/picker';
import uploadTbtAtHomeFile from '../../../../functions/database/uploadTbtAtHomeFile';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';

type TBTAtHomeDetailRouteProps = RouteProp<
    ResourceNavigationParamList,
    'New TBT At Home Resource'
>;

type NewEventProps = {
    route: TBTAtHomeDetailRouteProps;
    navigation: NativeStackNavigationProp<any>;
};

function NewTbtAtHome({ navigation, route }: NewEventProps) {
    const { tbtAtHome } = route.params;
    const generateStyle = useStyle();

    const { addTbtAtHome } = resourcesStorage();

    const [title, setTitle] = useState<string>(tbtAtHome?.title ?? '');
    const [passage, setPassage] = useState<string>(tbtAtHome?.passage ?? '');
    // const [a, setLocation] = useState<string>(tbtAtHome?.added ?? '');
    const [resource, setResource] = useState<string>(tbtAtHome?.resource ?? '');
    const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse>();

    const handleSubmit = () => {
        if (!title || !passage || !resource) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields.',
            );
            return;
        }

        if (tbtAtHome) {
            // Event exists, user wants to edit existing event.
            // const newTbtAtHome: ITbtAtHome = {
            //     ...tbtAtHome,
            //     title,
            //     passage,
            // };
            Alert.alert('Editing existing Tbt@Home is not yet supported.');
        } else {
            if (!selectedFile) {
                Alert.alert('No file selected', 'Please select a PDF file.');
            } else {
                uploadTbtAtHomeFile(selectedFile, resource).then(res => {
                    if (res) {
                        const newTbtAtHome: Omit<ITbtAtHome, 'id'> = {
                            title,
                            passage,
                            added: Timestamp.now(),
                            resource: res,
                        };

                        addItemToDatabase(newTbtAtHome, 'tbtAtHome').then(
                            resp => {
                                if (resp.status === 'success' && resp.id) {
                                    addTbtAtHome({
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
            }
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
                <Text style={textStyle}>Resource (PDF) *</Text>
                <TouchableOpacity
                    onPress={() => {
                        pick({ type: 'com.adobe.pdf' })
                        pick({ type: 'application/pdf' })
                            .then(res => {
                                if (res && res.length > 0) {
                                    setSelectedFile(res[0]);
                                    setResource(
                                        res[0].name
                                            ? `tbtAtHome/${res[0].name}`
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

                <Text style={textStyle}>Passage *</Text>
                <TextInput
                    style={inputStyle}
                    value={passage}
                    onChangeText={setPassage}
                />
                <Spacer />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={addButtonStyle}
                    >
                        <Text style={{ ...textStyle, color: colors.orange }}>
                            {tbtAtHome ? 'Edit' : 'Add'} Event
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

export default NewTbtAtHome;
