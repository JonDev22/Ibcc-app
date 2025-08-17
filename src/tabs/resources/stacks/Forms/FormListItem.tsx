import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../theme/colors';

// Type for a form item
export type FormItem = {
    id: string;
    title: string;
    description?: string;
    submitTo: string; // text telling the user where to send it
};

const FormListItem: React.FC<FormItem> = ({ title, description, submitTo }) => {
    return (
        <TouchableOpacity style={styles.formCard} activeOpacity={0.85}>
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
                <Text style={styles.formSubmit}>Send to: {submitTo}</Text>
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
        backgroundColor: colors.white100,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
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
