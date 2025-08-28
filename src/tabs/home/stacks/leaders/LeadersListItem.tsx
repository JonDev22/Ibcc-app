import { StyleSheet, Text, View } from 'react-native';
import { ILeader } from '../../../../interfaces/ILeader';

const LeaderListItem: React.FC<{ leader: ILeader }> = ({ leader }) => (
    <View style={styles.card}>
        <Text style={styles.subtitle}>{leader.name}</Text>
        <Text style={styles.text}>{leader.position}</Text>
    </View>
);

export default LeaderListItem;

const styles = StyleSheet.create({
    card: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    text: {
        fontSize: 13,
    },
});
