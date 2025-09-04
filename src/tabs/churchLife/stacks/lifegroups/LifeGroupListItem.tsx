import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, Text, View } from 'react-native';
import { ILifeGroup } from '../../../../interfaces/ILifeGroup';
import { colors } from '../../../../theme/colors';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';

interface LifeGroupItemProps {
    group: ILifeGroup;
}

function LifeGroupItem({ group }: LifeGroupItemProps) {
    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const textStyle = generateStyle('fontS');
    const locationStyle = generateStyle('fontM', 'primary', 'weight600');

    return (
        <View style={styles.card}>
            <Text style={locationStyle}>{group.name}</Text>
            <View style={styles.customSpacer} />
            <View style={styles.view}>
                <FontAwesome name="map-pin" size={14} color={colorMap.third} />
                <Text style={textStyle}>{group.location}</Text>
            </View>
            <View style={styles.view}>
                <FontAwesome
                    name="calendar"
                    size={14}
                    color={colorMap.primary}
                />
                <Text style={textStyle}>{group.time}</Text>
            </View>
            <View style={styles.view}>
                <FontAwesome name="phone" size={14} color={colors.orchid} />
                <Text style={textStyle}>Contact: {group.contact}</Text>
            </View>
        </View>
    );
}

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
    customSpacer: {
        marginBottom: 4,
    },
});
