import { FlatList, StyleSheet, Text, View } from 'react-native';
import sortByNumOfText from '../../../../functions/sortByNumOfText';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';

interface ResourceListViewProps {
    items: [string, string][];
    header: string;
    text?: string;
}

function ResourceListView({ items, header, text }: ResourceListViewProps) {
    const generateStyle = useStyle();

    const titleStyle = generateStyle('fontL', 'bold');
    const keyStyle = generateStyle(
        'fontXS',
        'hPaddingXL',
        'bold',
        'textLine20',
    );
    const textStyle = generateStyle('fontXS');
    const justifiedText = generateStyle('fontXS', 'textJustify', 'textLine20');

    return (
        <View style={styles.centeredView}>
            <Text style={titleStyle}>{header}</Text>
            <Text style={justifiedText}>{text}</Text>
            <Spacer />
            <FlatList
                data={sortByNumOfText(items)}
                keyExtractor={([key]) => key}
                renderItem={({ item: [key, value] }) => (
                    <View key={key} style={styles.resourcesStringView}>
                        <Text style={keyStyle}>{key}</Text>
                        <Text style={textStyle}>{value}</Text>
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
    flatList: {
        flexGrow: 0,
    },
    resourcesStringView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});
