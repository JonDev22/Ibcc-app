import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import useStyle from '../../hooks/useStyle';
import AddButton from '../../components/AddButton';
import { useState } from 'react';
import { pick, DocumentPickerResponse } from '@react-native-documents/picker';
import getPlatformSpecificType from '../../functions/getPlatformSpecificType';
import getAudioDuration from '../../functions/getAudioDuration';
import { IAudioFileFB } from './interfaces/IAudioFile';
import uploadTbtAtHomeFile from '../../functions/database/uploadTbtAtHomeFile';
import addItemToDatabase from '../../functions/database/addItemToDatabase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import resourcesStorage from '../../storage/resourcesStorage';
import { Track } from 'react-native-track-player';

type AddAudioProps = {
    navigation: NativeStackNavigationProp<any>;
};

function AddAudio({ navigation }: AddAudioProps) {
    const generateStyle = useStyle();

    const [album, setAlbum] = useState<string>('');
    const [artist, setArtist] = useState<string>('IBC Cologne');
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');

    const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse>();
    const [resource, setResource] = useState<string>('');

    const { addAudioTrack } = resourcesStorage();

    const containerStyle = generateStyle(
        'hMinMax',
        'flex',
        'justifyBetween',
        'wPadding2XL',
        'hPadding2XL',
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

    const inputViewStyle = generateStyle('flex', 'flexCol', 'wMarginM', 'gap2');

    const titleStyle = generateStyle('fontS');

    const handleAddAudio = async () => {
        if (
            !title ||
            !artist ||
            !album ||
            !subtitle ||
            !selectedFile ||
            !resource
        ) {
            Alert.alert('Please fill all required fields.');
            return;
        }

        const result = await uploadTbtAtHomeFile(selectedFile, resource);

        if (!result) {
            Alert.alert(
                'Upload Failed',
                'There was an error uploading the file. Please try again.',
            );
            return;
        }

        const duration = await getAudioDuration(result);

        const newSong: Omit<IAudioFileFB, 'id'> = {
            title,
            artist,
            album,
            subtitle,
            audio_duration: duration,
            number: Math.round(Math.random() * 100),
            file: result,
        };

        addItemToDatabase(newSong, 'audios').then(res => {
            if (res.status === 'success' && res.id) {
                const track: Track = {
                    url: result,
                    title,
                    duration,
                    artist,
                    album,
                    subtitle: subtitle,
                };

                addAudioTrack(track);
                navigation.goBack();
            } else {
                Alert.alert(
                    res.message ?? 'Could not add audio file to database.',
                );
            }
        });
    };

    const createField = (
        title: string,
        value: string,
        onChange: (value: string) => void,
        placeholder?: string,
    ) => (
        <View style={inputViewStyle}>
            <Text style={titleStyle}>{title}*</Text>
            <TextInput
                style={inputStyle}
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
            />
        </View>
    );

    return (
        <View style={containerStyle}>
            <ScrollView
                style={styles.scrollViewStyle}
                contentContainerStyle={styles.scrollViewStyle}
            >
                {createField(
                    'Title',
                    title,
                    setTitle,
                    "e.g. 'To God Be The Glory'",
                )}
                {createField(
                    'Verse Reference',
                    subtitle,
                    setSubtitle,
                    "e.g. 'Genesis 1:1-2:4a'",
                )}
                {createField('Album', album, setAlbum, "e.g. 'Genesis'")}
                {createField('Artist', artist, setArtist, "e.g. 'IBC Cologne'")}

                {/* Component to pick an mp3 file from device. */}
                <View style={inputViewStyle}>
                    <Text style={titleStyle}>Audio File*</Text>
                    <TouchableOpacity
                        onPress={() => {
                            pick(
                                getPlatformSpecificType([
                                    'mp3',
                                    'wav',
                                    'aac',
                                    'm4a',
                                ]),
                            )
                                .then(res => {
                                    if (res && res.length > 0) {
                                        setSelectedFile(res[0]);
                                        setResource(
                                            res[0].name
                                                ? `audios/${res[0].name}`
                                                : 'Error retrieving name',
                                        );
                                    }
                                })
                                .catch(err => {
                                    // Also thrown when user cancels file picker.
                                    console.error(err);
                                });
                        }}
                    >
                        <Text style={inputStyle}>
                            {resource ? resource : 'Select Audio File...'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <AddButton
                    handleAddEvent={handleAddAudio}
                    buttonLabel="Add Audio"
                />
            </ScrollView>
        </View>
    );
}

export default AddAudio;

const styles = StyleSheet.create({
    scrollViewStyle: {
        gap: 16,
    },
});
