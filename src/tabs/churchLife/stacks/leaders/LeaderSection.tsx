import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ILeader } from '../../../../interfaces/ILeader';
import LeaderListItem from './LeadersListItem';
import Separator from '../../../../functions/Separator';
import { colors } from '../../../../theme/colors';

const LeaderSection: React.FC<{ title: string; data: ILeader[] }> = ({
    title,
    data,
}) => (
    <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <LeaderListItem leader={item} />}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
            ItemSeparatorComponent={Separator}
        />
    </View>
);

export default LeaderSection;

const styles = StyleSheet.create({
    section: {
        padding: 10,
    },
    listContainer: {
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    title: {
        fontSize: 18,
        color: colors.petrolBlue,
        fontWeight: '700',
        marginBottom: 6,
        paddingLeft: 12,
        paddingTop: 12,
    },
});
