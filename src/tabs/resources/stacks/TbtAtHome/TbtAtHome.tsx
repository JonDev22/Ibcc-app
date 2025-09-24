import {
    Alert,
    FlatList,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Separator from '../../../../functions/Separator';
import InfoCard from '../../../../components/InfoCard';
import fetchFileFromStorage from '../../../../functions/database/fetchFileFromStorage';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import resourcesStorage from '../../../../storage/resourcesStorage';

function ListItem({ item }: { item: { text: string } }) {
    const generateStyle = useStyle();
    const listTextStyle = generateStyle('textJustify', 'textLine20');
    return <Text style={listTextStyle}>{item.text}</Text>;
}

function TbtAtHome() {
    const { tbtAtHome } = resourcesStorage();

    const generateStyle = useStyle();

    const handlePress = async (resource: string) => {
        const res = await fetchFileFromStorage(resource);

        if (res) {
            Linking.canOpenURL(res).then(canOpen => {
                if (canOpen) {
                    Linking.openURL(res);
                }
            });
        } else {
            Alert.alert('Resource not found');
        }
    };

    const containerStyle = generateStyle('hMinMax');

    const subHeaderStyle = generateStyle(
        'selfCenter',
        'wPadding2XL',
        'bold',
        'fontS',
    );

    return (
        <View style={containerStyle}>
            <ScrollView style={styles.container}>
                <FlatList
                    data={tbtDisclaimData}
                    keyExtractor={item => item.text}
                    renderItem={item => <ListItem {...item} />}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={Separator}
                    scrollEnabled={false}
                />

                <Text style={subHeaderStyle}>Resources</Text>
                <FlatList
                    data={tbtAtHome}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => (
                        <InfoCard
                            image="users"
                            text={`TBT@Home in ${item.passage}`}
                            header={item.title}
                            onPress={() => handlePress(item.resource)}
                            headerLeft
                            buttonText="Download"
                        />
                    )}
                    scrollEnabled={false}
                    ItemSeparatorComponent={Spacer}
                />
            </ScrollView>
        </View>
    );
}

export default TbtAtHome;

const tbtDisclaimData = [
    {
        text: 'TBT@Home is designed to help parents lead their children through the Bible.',
    },
];

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    list: { padding: 15 },
});
