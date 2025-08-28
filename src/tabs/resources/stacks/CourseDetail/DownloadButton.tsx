import FontAwesome from '@react-native-vector-icons/fontawesome';
import { Alert, Linking, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../../../theme/colors';
import fetchFileFromStorage from '../../../../functions/fetchFileFromStorage';

interface DownloadButtonProps {
    text: string;
    url: string;
}

function DownloadButton(props: DownloadButtonProps) {
    const fetchDocFromStorage = async () => {
        const url = await fetchFileFromStorage(props.url);
        if (url) {
            Linking.openURL(url);
        } else {
            Alert.alert('Could not find resource');
        }
    };

    return (
        <Pressable style={styles.pressableStyle} onPress={fetchDocFromStorage}>
            <Text style={styles.pressableText}>{props.text}</Text>
            <FontAwesome
                name="download"
                size={20}
                style={styles.pressableText}
            />
        </Pressable>
    );
}

export default DownloadButton;

const styles = StyleSheet.create({
    pressableStyle: {
        backgroundColor: colors.petrolBlue,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        marginTop: 20,
    },
    pressableText: {
        color: colors.white100,
    },
});
