import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ILifeGroup } from '../../../../interfaces/ILifeGroup';
import { colors } from '../../../../theme/colors';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';
import { ChurchNavigationParamList } from '../../types/churchNavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<
    ChurchNavigationParamList,
    'Life Group'
>;

interface LifeGroupItemProps {
    group: ILifeGroup;
}

function LifeGroupItem({ group }: LifeGroupItemProps) {
    const navigate = useNavigation<NavigationProps>();

    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const textStyle = generateStyle('fontS');
    const locationStyle = generateStyle('fontM', 'primary', 'weight600');

    const handleTouch = () => {
        navigate.navigate('Life Group', { group });
    };

    return (
        <TouchableOpacity style={styles.flexContainer} onPress={handleTouch}>
            <View style={styles.card}>
                <Text style={locationStyle}>{group.name}</Text>
                <View style={styles.customSpacer} />
                <View style={styles.view}>
                    <FontAwesome
                        name="map-pin"
                        size={14}
                        color={colorMap.third}
                    />
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
            <View style={{ alignSelf: 'center' }}>
                <FontAwesome
                    name="chevron-right"
                    size={20}
                    color={colorMap.primary}
                />
            </View>
        </TouchableOpacity>
    );
}

export default LifeGroupItem;

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: 16,
    },
    card: {
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
