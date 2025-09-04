import { StyleSheet, Text, View } from 'react-native';
import { ILeader } from '../../../../interfaces/ILeader';
import useStyle from '../../../../hooks/useStyle';

function LeaderListItem({ leader }: { leader: ILeader }) {
    const generateStyle = useStyle();

    const subTitleStyle = generateStyle('fontXS', 'weight500');
    const textStyle = generateStyle('fontXS');

    return (
        <View style={styles.card}>
            <Text style={subTitleStyle}>{leader.name}</Text>
            <Text style={textStyle}>{leader.position}</Text>
        </View>
    );
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
