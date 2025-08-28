import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, Text, View } from 'react-native';
import { ILifeGroup } from '../../../../interfaces/ILifeGroup';
import { colors } from '../../../../theme/colors';

const LifeGroupItem: React.FC<{ group: ILifeGroup }> = ({ group }) => (
    <View style={styles.card}>
        <Text style={styles.location}>{group.name}</Text>
        <View style={styles.view}>
            <FontAwesome name="map-pin" size={14} color={colors.orange} />
            <Text style={styles.text}>{group.location}</Text>
        </View>
        <View style={styles.view}>
            <FontAwesome name="calendar" size={14} color={colors.petrolBlue} />
            <Text style={styles.text}>{group.time}</Text>
        </View>
        <View style={styles.view}>
            <FontAwesome name="phone" size={14} color={colors.orchid} />
            <Text style={styles.text}>Contact: {group.contact}</Text>
        </View>
    </View>
);

export default LifeGroupItem;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        gap: 4,
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    location: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: colors.petrolBlue,
    },
    text: {
        fontSize: 14,
        marginTop: 2,
    },
});
