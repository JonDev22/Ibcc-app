import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import {
    Alert,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../../../theme/colors';
import { IForm } from '../../../../interfaces/IForm';
import fetchFileFromStorage from '../../../../functions/fetchFileFromStorage';

const FormListItem: React.FC<IForm> = ({
    title,
    description,
    contact,
    form,
}) => {
    const handlePress = () => {
        fetchFileFromStorage(form).then(url => {
            if (url) {
                Linking.openURL(url);
            } else {
                Alert.alert('Resource not found!');
            }
        });
    };

    return (
        <TouchableOpacity
            style={styles.formCard}
            activeOpacity={0.85}
            onPress={handlePress}
        >
            <FontAwesome
                name="file"
                size={28}
                color={colors.petrolBlue}
                style={styles.faIcon}
            />
            <View style={styles.flexView}>
                <Text style={styles.formTitle}>{title}</Text>
                {description ? (
                    <Text style={styles.formDescription}>{description}</Text>
                ) : null}
                <Text style={styles.formSubmit}>Send to: {contact}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FormListItem;

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
    },
    formCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: colors.white100,
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    faIcon: {
        marginRight: 10,
    },
    formTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.petrolBlue,
        marginBottom: 4,
    },
    formDescription: {
        fontSize: 14,
        color: colors.orange,
        marginBottom: 4,
    },
    formSubmit: {
        fontSize: 13,
        fontStyle: 'italic',
        color: colors.slateBlue,
    },
});
