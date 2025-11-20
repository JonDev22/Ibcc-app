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
import getIconFromString from '../../../../functions/getIconFromString';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import resourcesStorage from '../../../../storage/resourcesStorage';

function ListItem({ item }: { item: { text: string } }) {
    const generateStyle = useStyle();
    const listTextStyle = generateStyle('textJustify', 'textLine20');
    return <Text style={listTextStyle}>{item.text}</Text>;
}

function TBT() {
    const { tbt } = resourcesStorage();

    const generateStyle = useStyle();

    const handlePress = async (resource: string) => {
        const res = await fetchFileFromStorage(resource);

        if (res) {
            Linking.openURL(res);
            // Linking.canOpenURL(res).then(canOpen => {
            //     if (canOpen) {
            //     }
            // });
        } else {
            Alert.alert('Resource not found');
        }
    };

    const containerStyle = generateStyle('hMinMax');
    const headerStyle = generateStyle(
        'wPadding2XL',
        'selfCenter',
        'bold',
        'fontL',
    );

    const subHeaderStyle = generateStyle(
        'selfCenter',
        'wPadding2XL',
        'bold',
        'fontS',
    );

    return (
        <View style={containerStyle}>
            <ScrollView style={styles.container}>
                <Text style={headerStyle}>Through The Bible Together</Text>
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
                    data={tbt}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => (
                        <InfoCard
                            image={getIconFromString(item.resourceType)}
                            text={item.text}
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

export default TBT;

const tbtDisclaimData = [
    {
        text: "TBT is IBCC's approach to Word ministry. We teach through the whole Bible, both Old and New Testaments. It is one story, covering events like the creation; the fall; God's choice of Abraham; the reign of King David; the birth of Jesus of Nazareth; the missionary adventures of the Apostle Paul…",
    },
    {
        text: 'We support one another as we learn. Each week, our church community gathers around the same Bible text. Our homegroups (Life Groups) discuss the same passage as was taught during our Sunday gathering, and our activities and material for the children is based on the same content. With TBT, we approach the study of the Bible as a whole community. ',
    },
];

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    list: { padding: 15 },
});
