import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { colors } from '../../../../theme/colors';
import { IMinistry } from '../../../../interfaces/IMinistry';
import getIconFromString from '../../../../functions/getIconFromString';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';

function MinistryListItem({ ministry }: { ministry: IMinistry }) {
    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const cardStyle = generateStyle(
        'rounded6',
        'border1',
        'borderPrimary',
        'hPadding4XL',
        'wPadding4XL',
        'gap2',
    );
    const titleStyle = generateStyle('fontM', 'weight700');
    const subTitleStyle = generateStyle('fontXS', 'weight500');
    const textStyle = generateStyle('fontXS');

    return (
        <View style={cardStyle}>
            <View style={styles.centeredView}>
                <FontAwesome
                    name={getIconFromString(ministry.icon)}
                    size={24}
                    color={colorMap.primary}
                />
                <Text style={titleStyle}>{ministry.name}</Text>
            </View>
            <Text style={subTitleStyle}>Leader: {ministry.leader}</Text>
            <Text style={textStyle}>Time: {ministry.time}</Text>
            <Text style={textStyle}>Responsibility: {ministry.task}</Text>
        </View>
    );
}

export default MinistryListItem;

const styles = StyleSheet.create({
    centeredView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingBottom: 8,
    },
    vision: {
        fontSize: 13,
        fontStyle: 'italic',
        marginTop: 4,
    },
});
