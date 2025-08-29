import {
    Alert,
    FlatList,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';
import Separator from '../../../../functions/Separator';
import InfoCard from '../../../../components/InfoCard';
import fetchFileFromStorage from '../../../../functions/fetchFileFromStorage';
import getIconFromString from '../../../../functions/getIconFromString';
import { use } from 'react';
import { ResourceContext } from '../../../../contexts/ResourceContext';

const listItem = ({ item }: { item: { text: string } }) => (
    <Text style={styles.listText}>{item.text}</Text>
);

function TBT() {
    const { tbt } = use(ResourceContext);

    const handlePress = async (resource: string) => {
        const res = await fetchFileFromStorage(resource);

        console.log(res);
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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Through The Bible Together</Text>
            <FlatList
                data={tbtDisclaimData}
                keyExtractor={item => item.text}
                renderItem={listItem}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={Separator}
                scrollEnabled={false}
            />

            <Text style={styles.subheader}>Resources</Text>
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
            />
        </ScrollView>
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
    header: {
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    subheader: {
        paddingVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    list: { padding: 15 },
    listText: {
        lineHeight: 20,
        textAlign: 'justify',
    },
});
