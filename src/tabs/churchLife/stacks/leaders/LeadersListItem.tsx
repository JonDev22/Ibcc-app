import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ILeader } from '../../../../interfaces/ILeader';
import useStyle from '../../../../hooks/useStyle';
import hasUserRole from '../../../../functions/hasUserRole';
import userSettings from '../../../../storage/userSettings';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { ChurchNavigationType } from '../../types/churchNavigationProps';
import { useNavigation } from '@react-navigation/native';

function LeaderListItem({ leader }: { leader: ILeader }) {
    const navigate = useNavigation<ChurchNavigationType<'Leader'>>();

    const generateStyle = useStyle();
    const { user } = userSettings();
    const isUserAdmin = hasUserRole(user, ['admin']);

    const subTitleStyle = generateStyle('fontXS', 'weight500');
    const textStyle = generateStyle('fontXS');

    const children = (
        <>
            <Text style={subTitleStyle}>{leader.name}</Text>
            <Text style={textStyle}>
                {leader.position}
                {isUserAdmin && <FontAwesome name="chevron-right" size={14} />}
            </Text>
        </>
    );

    const editableComponent = (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigate.navigate('Leader', { leader })}
        >
            {children}
        </TouchableOpacity>
    );
    const generalComponent = <View style={styles.card}>{children}</View>;

    return isUserAdmin ? editableComponent : generalComponent;
}

export default LeaderListItem;

const styles = StyleSheet.create({
    card: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
