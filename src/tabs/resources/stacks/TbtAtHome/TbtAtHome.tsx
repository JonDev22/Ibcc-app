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
import userSettings from '../../../../storage/userSettings';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationProps';
import deleteTbtAtHomeEntry from '../../../../functions/database/deleteTbtAtHomeEntry';
import hasUserRole from '../../../../functions/hasUserRole';
import { userGroups } from '../../../../constants/userGroups';
import AddButton from '../../../../components/AddButton';

function ListItem({ item }: { item: { text: string } }) {
    const generateStyle = useStyle();
    const listTextStyle = generateStyle('textJustify', 'textLine20');
    return <Text style={listTextStyle}>{item.text}</Text>;
}

function TbtAtHome() {
    const { tbtAtHome, removeTbtAtHome } = resourcesStorage();
    const { user } = userSettings();

    const navigation = useNavigation<NavigationType<'TBT@Home'>>();

    const generateStyle = useStyle();

    const handlePress = async (resource: string) => {
        const res = await fetchFileFromStorage(resource);

        if (res) {
            Linking.openURL(res);
            // Linking.canOpenURL(res).then(canOpen => {
            //     console.log(canOpen);
            //     if (canOpen) {
            //         Linking.openURL(res);
            //     }
            // });
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

    const handleAddEvent = () => {
        navigation.navigate('New TBT At Home Resource', {});
    };

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

                {hasUserRole(user, ['admin', 'tbtAtHomeEditor']) && (
                    <AddButton
                        handleAddEvent={handleAddEvent}
                        buttonLabel="Add TBT@Home Resource"
                    />
                )}

                <FlatList
                    data={tbtAtHome}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => (
                        <InfoCard
                            image="users"
                            text={`${item.passage}`}
                            header={item.title}
                            onPress={() => handlePress(item.resource)}
                            headerLeft
                            buttonText="Download"
                            deletable={hasUserRole(user, [
                                userGroups.tbtAtHomeEditor,
                                userGroups.ADMIN,
                            ])}
                            deletableAction={() => {
                                Alert.alert(
                                    'Delete Resource',
                                    'Are you sure you want to delete this resource?',
                                    [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Delete',
                                            style: 'destructive',
                                            onPress: () => {
                                                deleteTbtAtHomeEntry(
                                                    item.id,
                                                    item.resource,
                                                    'tbtAtHome',
                                                ).then(res => {
                                                    if (res) {
                                                        removeTbtAtHome(item);
                                                    } else {
                                                        Alert.alert(
                                                            'Error deleting resource',
                                                        );
                                                    }
                                                });
                                            },
                                        },
                                    ],
                                );
                            }}
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
