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
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';

function FormListItem({ title, description, contact, form }: IForm) {
    const generateStyle = useStyle();

    const handlePress = () => {
        fetchFileFromStorage(form).then(url => {
            if (url) {
                Linking.openURL(url);
            } else {
                Alert.alert('Resource not found!');
            }
        });
    };

    const titleStyle = generateStyle('fontS', 'primary', 'weight600');
    const descriptionStyle = generateStyle('fontXS', 'third');
    const submitStyle = generateStyle('fontXS', 'italic', 'secondary');

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
                <Text style={titleStyle}>{title}</Text>
                <View style={styles.customSpacer} />
                {description ? (
                    <>
                        <Text style={descriptionStyle}>{description}</Text>
                        <View style={styles.customSpacer} />
                    </>
                ) : null}
                <Text style={submitStyle}>Send to: {contact}</Text>
            </View>
        </TouchableOpacity>
    );
}

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
        marginBottom: 6,
    },
    faIcon: {
        marginRight: 10,
    },
    customSpacer: { marginBottom: 4 },
});
