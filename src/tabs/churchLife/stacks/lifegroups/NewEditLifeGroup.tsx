import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import composeMail from '../../../../functions/composeMail';
import { RouteProp } from '@react-navigation/native';
import { ChurchNavigationParamList } from '../../types/churchNavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStyle from '../../../../hooks/useStyle';
import { ILifeGroup } from '../../../../interfaces/ILifeGroup';
import AddButton from '../../../../components/AddButton';
import Spacer from '../../../../components/Spacer';
import userSettings from '../../../../storage/userSettings';
import hasUserRole from '../../../../functions/hasUserRole';
import { useState } from 'react';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';
import editItemInDatabase from '../../../../functions/database/editItemInDatabase';
import deleteItem from '../../../../functions/database/deleteItem';
import resourcesStorage from '../../../../storage/resourcesStorage';

type LifeGroupDetailRoutes = RouteProp<ChurchNavigationParamList, 'Life Group'>;

type LifeGroupProps = {
    route: LifeGroupDetailRoutes;
    navigation: NativeStackNavigationProp<any>;
};

function NewEditLifeGroup({ navigation, route }: LifeGroupProps) {
    const { group } = route.params;
    const generateStyle = useStyle();

    const { user } = userSettings();
    const { addLifeGroup, editLifeGroup, removeLifeGroup } = resourcesStorage();

    const [name, setName] = useState<string>(group?.name ?? '');
    const [location, setLocation] = useState<string>(group?.location ?? '');
    const [contact, setContact] = useState<string>(group?.contact ?? '');
    const [time, setTime] = useState<string>(group?.time ?? '');
    const [day, setDay] = useState<string>(group?.day ?? '');
    const [type, setType] = useState<string>(group?.type ?? '');
    const [loading, setLoading] = useState<boolean>(false);

    const userCanEdit = hasUserRole(user, ['admin']);

    const handleTouchMail = (lifeGroup: ILifeGroup) => {
        composeMail(
            'admin@ibc-cologne.com',
            'Life Group',
            `${lifeGroup.name}, ${lifeGroup.contact}, ${lifeGroup.location}`,
        );
    };

    const handleCreateLifeGroup = () => {
        if (!name || !location || !contact || !time || !day || !type) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields to create a life group.',
            );
            return;
        }

        const newLifeGroup: Omit<ILifeGroup, 'id'> = {
            name,
            location,
            contact,
            time,
            day,
            type,
        };

        if (group) {
            const editedLifeGroup: ILifeGroup = {
                ...newLifeGroup,
                id: group.id,
            };

            editItemInDatabase<ILifeGroup>(editedLifeGroup, 'lifegroups')
                .then(res => {
                    if (res.status === 'success' && res.id) {
                        editLifeGroup(editedLifeGroup);
                        navigation.goBack();
                    } else {
                        Alert.alert('Error', 'Failed to edit life group.');
                    }
                })
                .catch(() => {
                    Alert.alert(
                        'Error',
                        'An error occurred while editing the life group.',
                    );
                });
            return;
        }

        setLoading(true);

        addItemToDatabase<ILifeGroup>(newLifeGroup, 'lifegroups')
            .then(res => {
                if (res.status === 'success' && res.id) {
                    addLifeGroup({ ...newLifeGroup, id: res.id });
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'Failed to create life group.');
                }
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'An error occurred while creating the life group.',
                );
            })
            .finally(() => setLoading(false));
    };

    const handleDeleteItem = (groupToDelete: ILifeGroup) => {
        deleteItem<ILifeGroup>(groupToDelete, 'lifegroups')
            .then(res => {
                if (res === 'success') {
                    removeLifeGroup(groupToDelete);
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'Failed to delete life group.');
                }
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'An error occurred while deleting the life group.',
                );
            });
    };

    const container = generateStyle('hMinMax');
    const textStyle = generateStyle('fontS');
    const inputStyle = generateStyle(
        'wPaddingL',
        'hPaddingL',
        'borderPrimary',
        'fontS',
        'rounded2',
    );

    const generateInputComponent = (
        title: string,
        value: string,
        changeFcn: (text: string) => void,
        required?: boolean,
    ) => {
        return (
            <View>
                <Text
                    style={{
                        ...textStyle,
                        fontWeight: required ? '800' : '500',
                    }}
                >
                    {title}
                    {required ? '*' : ''}
                </Text>
                <TextInput
                    style={{
                        ...inputStyle,
                        borderWidth: userCanEdit ? 1 : 0,
                        paddingHorizontal: userCanEdit ? 10 : 0,
                    }}
                    onChangeText={changeFcn}
                    value={value}
                    editable={userCanEdit}
                />
                <Spacer />
            </View>
        );
    };

    return (
        <View style={container}>
            <ScrollView style={styles.container}>
                <Spacer />

                {generateInputComponent('Name', name, setName, true)}
                {generateInputComponent(
                    'Location',
                    location,
                    setLocation,
                    true,
                )}
                {generateInputComponent('Contact', contact, setContact, true)}
                {generateInputComponent('Time', time, setTime, true)}
                {generateInputComponent('Day', day, setDay, true)}
                {generateInputComponent('Type', type, setType, true)}

                <Spacer />

                {group && (
                    <>
                        <AddButton
                            handleAddEvent={() => handleTouchMail(group)}
                            buttonLabel="Contact Life Group"
                            disabled={loading}
                        />
                        {userCanEdit && (
                            <>
                                <AddButton
                                    handleAddEvent={() =>
                                        handleCreateLifeGroup()
                                    }
                                    buttonLabel="Save Changes"
                                    disabled={loading}
                                />
                                <AddButton
                                    handleAddEvent={() =>
                                        handleDeleteItem(group)
                                    }
                                    buttonLabel="Delete Life Group"
                                    disabled={loading}
                                />
                            </>
                        )}
                    </>
                )}
                {!group && (
                    <AddButton
                        handleAddEvent={() => handleCreateLifeGroup()}
                        buttonLabel="Create Life Group"
                        disabled={loading}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default NewEditLifeGroup;
