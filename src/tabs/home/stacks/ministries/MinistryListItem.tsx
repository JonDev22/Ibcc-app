import { StyleSheet, Text, View } from 'react-native';
import FontAwesome, {
    FontAwesomeIconName,
} from '@react-native-vector-icons/fontawesome';
import { colors } from '../../../../theme/colors';
import { IMinistry } from '../../../../interfaces/IMinistry';

const MinistryListItem: React.FC<{ ministry: IMinistry }> = ({ ministry }) => {
    return (
        <View style={styles.card}>
            <View style={styles.centeredView}>
                <FontAwesome
                    name={ministry.icon as FontAwesomeIconName}
                    size={28}
                    color={colors.petrolBlue}
                />
                <Text style={styles.title}>{ministry.name}</Text>
            </View>
            <Text style={styles.subtitle}>Leader: {ministry.leader}</Text>
            <Text style={styles.text}>Time: {ministry.time}</Text>
            <Text style={styles.text}>Responsibility: {ministry.task}</Text>
        </View>
    );
};

export default MinistryListItem;

const styles = StyleSheet.create({
    centeredView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingBottom: 8,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.petrolBlue,
    },
    title: {
        fontSize: 18,
        color: colors.petrolBlue,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    text: {
        fontSize: 13,
        marginBottom: 2,
    },
    vision: {
        fontSize: 13,
        fontStyle: 'italic',
        marginTop: 4,
    },
});
