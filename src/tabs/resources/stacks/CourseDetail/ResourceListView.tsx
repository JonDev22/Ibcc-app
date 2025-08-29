import { FlatList, StyleSheet, Text, View } from 'react-native';
import sortByNumOfText from '../../../../functions/sortByNumOfText';

interface ResourceListViewProps {
    items: [string, string][];
    header: string;
    text?: string;
}

function ResourceListView({ items, header, text }: ResourceListViewProps) {
    return (
        <View style={styles.centeredView}>
            <Text style={styles.title}>{header}</Text>
            <Text style={styles.centeredText}>{text}</Text>
            <FlatList
                data={sortByNumOfText(items)}
                keyExtractor={([key]) => key}
                renderItem={({ item: [key, value] }) => (
                    <View key={key} style={styles.resourcesStringView}>
                        <Text style={styles.resourceKey}>{key}</Text>
                        <Text>{value}</Text>
                    </View>
                )}
                scrollEnabled={false}
                style={styles.flatList}
            />
        </View>
    );
}

export default ResourceListView;

const styles = StyleSheet.create({
    centeredView: {
        padding: 20,
        alignItems: 'center',
        gap: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    flatList: {
        flexGrow: 0,
    },
    resourcesStringView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    resourceKey: {
        width: 40,
        fontWeight: 'bold',
    },
    centeredText: {
        textAlign: 'justify',
        lineHeight: 25,
    },
});
