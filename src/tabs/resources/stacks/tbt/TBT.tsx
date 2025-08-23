import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';
import Separator from '../../../../functions/Separator';
import InfoCard from '../../../../components/InfoCard';
import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';

const listItem = ({ item }: { item: { text: string } }) => (
    <Text style={styles.listText}>{item.text}</Text>
);

const getTypeImage = (type: string): FontAwesomeIconName => {
    switch (type) {
        case 'poster':
            return 'object-group';
        default:
            return 'yoast';
    }
};

function TBT() {
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
                data={tbtResources}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
                    <InfoCard
                        image={getTypeImage(item.type)}
                        text={item.displayText}
                        header={item.title}
                        onPress={() => {}}
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

const tbtResources = [
    {
        type: 'poster',
        title: 'Mark',
        displayText: 'Poster overview for Mark',
    },
    {
        type: 'poster',
        title: 'Deuteronomy',
        displayText: 'Poster overview for Deuteronomy',
    },
    {
        type: 'poster',
        title: 'Exodus',
        displayText: 'Poster overview for Exodus',
    },
    {
        type: 'poster',
        title: 'Leviticus',
        displayText: 'Poster overview for Leviticus',
    },
    {
        type: 'poster',
        title: '2. Corinthians',
        displayText: 'Poster overview for 2. Corinthians',
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
