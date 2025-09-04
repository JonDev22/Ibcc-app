import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ILeader } from '../../../../interfaces/ILeader';
import LeaderListItem from './LeadersListItem';
import Separator from '../../../../functions/Separator';
import { colors } from '../../../../theme/colors';
import useStyle from '../../../../hooks/useStyle';

function LeaderSection({ title, data }: { title: string; data: ILeader[] }) {
    const generateStyle = useStyle();

    const titleStyle = generateStyle(
        'fontM',
        'weight700',
        'primary',
        'hPadding3XL',
        'wPadding3XL',
    );

    return (
        <View style={styles.section}>
            <Text style={titleStyle}>{title}</Text>
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
}

export default LeaderSection;

const styles = StyleSheet.create({
    section: {
        padding: 10,
    },
    listContainer: {
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
});
