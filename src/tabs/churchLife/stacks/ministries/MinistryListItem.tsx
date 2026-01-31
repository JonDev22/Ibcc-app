import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { IMinistry } from '../../../../interfaces/IMinistry';
import getIconFromString from '../../../../functions/getIconFromString';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';
import composeMail from '../../../../functions/composeMail';

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
    const titleStyle = generateStyle('fontM', 'weight700', 'secondary');
    const subTitleStyle = generateStyle('fontXS', 'weight500', 'third');
    const textStyle = generateStyle('fontXS');

    const handleTouch = () => {
        composeMail('admin@ibc-cologne.com', ministry.name, ministry.name);
    };

    return (
        <TouchableOpacity style={cardStyle} onPress={handleTouch}>
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
        </TouchableOpacity>
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
