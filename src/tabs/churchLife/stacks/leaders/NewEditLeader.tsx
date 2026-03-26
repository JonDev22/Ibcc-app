import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ChurchNavigationParamList } from '../../types/churchNavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStyle from '../../../../hooks/useStyle';
import AddButton from '../../../../components/AddButton';
import Spacer from '../../../../components/Spacer';
import userSettings from '../../../../storage/userSettings';
import hasUserRole from '../../../../functions/hasUserRole';
import { useState } from 'react';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';
import editItemInDatabase from '../../../../functions/database/editItemInDatabase';
import deleteItem from '../../../../functions/database/deleteItem';
import resourcesStorage from '../../../../storage/resourcesStorage';
import { ILeader } from '../../../../interfaces/ILeader';

type LeaderDetailRoutes = RouteProp<ChurchNavigationParamList, 'Leader'>;

type LeaderProps = {
    route: LeaderDetailRoutes;
    navigation: NativeStackNavigationProp<any>;
};

function NewEditLeader({ navigation, route }: LeaderProps) {
    const { leader } = route.params;
    const generateStyle = useStyle();

    const { user } = userSettings();
    const { addLeader, editLeader, removeLeader } = resourcesStorage();

    const [name, setName] = useState<string>(leader?.name ?? '');
    const [position, setPosition] = useState<string>(leader?.position ?? '');
    const [type, setType] = useState<string>(leader?.type ?? '');
    const [loading, setLoading] = useState<boolean>(false);

    const userCanEdit = hasUserRole(user, ['admin']);

    const handleCreateLeader = () => {
        if (!name || !position || !type) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields to create a leader.',
            );
            return;
        }

        const newLeader: Omit<ILeader, 'id'> = {
            name,
            position,
            type,
        };

        if (leader) {
            const newEditedLeader: ILeader = {
                ...newLeader,
                id: leader.id,
            };

            editItemInDatabase<ILeader>(newEditedLeader, 'leaders')
                .then(res => {
                    if (res.status === 'success' && res.id) {
                        editLeader(newEditedLeader);
                        navigation.goBack();
                    } else {
                        Alert.alert('Error', 'Failed to edit leader.');
                    }
                })
                .catch(() => {
                    Alert.alert(
                        'Error',
                        'An error occurred while editing the leader.',
                    );
                });
            return;
        }

        setLoading(true);

        addItemToDatabase<ILeader>(newLeader, 'leaders')
            .then(res => {
                if (res.status === 'success' && res.id) {
                    addLeader({ ...newLeader, id: res.id });
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'Failed to create leader.');
                }
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'An error occurred while creating the leader.',
                );
            })
            .finally(() => setLoading(false));
    };

    const handleDeleteItem = (groupToDelete: ILeader) => {
        deleteItem<ILeader>(groupToDelete, 'leaders')
            .then(res => {
                if (res === 'success') {
                    removeLeader(groupToDelete);
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'Failed to delete leader.');
                }
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'An error occurred while deleting the leader.',
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
                    'Position',
                    position,
                    setPosition,
                    true,
                )}
                {generateInputComponent('Type', type, setType, true)}

                <Spacer />

                {leader && userCanEdit && (
                    <>
                        <AddButton
                            handleAddEvent={() => handleCreateLeader()}
                            buttonLabel="Save Changes"
                            disabled={loading}
                        />
                        <AddButton
                            handleAddEvent={() => handleDeleteItem(leader)}
                            buttonLabel="Delete Leader"
                            disabled={loading}
                        />
                    </>
                )}
                {!leader && (
                    <AddButton
                        handleAddEvent={() => handleCreateLeader()}
                        buttonLabel="Create Leader"
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

export default NewEditLeader;
