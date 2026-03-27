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
import AddButton from '../../../../components/AddButton';
import Spacer from '../../../../components/Spacer';
import userSettings from '../../../../storage/userSettings';
import hasUserRole from '../../../../functions/hasUserRole';
import { useState } from 'react';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';
import editItemInDatabase from '../../../../functions/database/editItemInDatabase';
import deleteItem from '../../../../functions/database/deleteItem';
import resourcesStorage from '../../../../storage/resourcesStorage';
import { IMinistry } from '../../../../interfaces/IMinistry';

type MinistryDetailRoutes = RouteProp<ChurchNavigationParamList, 'Ministry'>;

type MinistryProps = {
    route: MinistryDetailRoutes;
    navigation: NativeStackNavigationProp<any>;
};

function NewEditMinistry({ navigation, route }: MinistryProps) {
    const { ministry } = route.params;
    const generateStyle = useStyle();

    const { user } = userSettings();
    const { addMinistry, editMinistry, removeMinistry } = resourcesStorage();

    const [name, setName] = useState<string>(ministry?.name ?? '');
    const [icon, setIcon] = useState<string>(ministry?.icon ?? '');
    const [leader, setLeader] = useState<string>(ministry?.leader ?? '');
    const [time, setTime] = useState<string>(ministry?.time ?? '');
    const [task, setTask] = useState<string>(ministry?.task ?? '');
    const [loading, setLoading] = useState<boolean>(false);

    const userCanEdit = hasUserRole(user, ['admin']);

    const handleTouchMail = (ministry: IMinistry) => {
        composeMail(
            'admin@ibc-cologne.com',
            'Ministry',
            `${ministry.name}, ${ministry.leader}, ${ministry.time}, ${ministry.task}`,
        );
    };

    const handleCreateMinistry = () => {
        if (!name || !icon || !leader || !time || !task) {
            Alert.alert(
                'Missing Fields',
                'Please fill in all required fields to create a life group.',
            );
            return;
        }

        const newMinistry: Omit<IMinistry, 'id'> = {
            name,
            icon,
            leader,
            time,
            task,
        };

        if (ministry) {
            const editedLifeGroup: IMinistry = {
                ...newMinistry,
                id: ministry.id,
            };

            editItemInDatabase<IMinistry>(editedLifeGroup, 'ministries')
                .then(res => {
                    if (res.status === 'success' && res.id) {
                        editMinistry(editedLifeGroup);
                        navigation.goBack();
                    } else {
                        Alert.alert('Error', 'Failed to edit ministry.');
                    }
                })
                .catch(() => {
                    Alert.alert(
                        'Error',
                        'An error occurred while editing the ministry.',
                    );
                });
            return;
        }

        setLoading(true);

        addItemToDatabase<IMinistry>(newMinistry, 'ministries')
            .then(res => {
                if (res.status === 'success' && res.id) {
                    addMinistry({ ...newMinistry, id: res.id });
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'Failed to create ministry.');
                }
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'An error occurred while creating the ministry.',
                );
            })
            .finally(() => setLoading(false));
    };

    const handleDeleteItem = (groupToDelete: IMinistry) => {
        deleteItem<IMinistry>(groupToDelete, 'ministries')
            .then(res => {
                if (res === 'success') {
                    removeMinistry(groupToDelete);
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'Failed to delete ministry.');
                }
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'An error occurred while deleting the ministry.',
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
                {generateInputComponent('Leader', leader, setLeader, true)}
                {generateInputComponent('Icon', icon, setIcon, true)}
                {generateInputComponent('Time', time, setTime, true)}

                <View>
                    <Text
                        style={{
                            ...textStyle,
                            fontWeight: '800',
                        }}
                    >
                        Tasks*
                    </Text>
                    {userCanEdit ? (
                        <TextInput
                            style={{
                                height: 100,
                                ...inputStyle,
                                borderWidth: userCanEdit ? 1 : 0,
                                paddingHorizontal: userCanEdit ? 10 : 0,
                            }}
                            value={task}
                            onChangeText={setTask}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            editable={userCanEdit}
                        />
                    ) : (
                        <Text style={{ ...textStyle, minHeight: 10 }}>
                            {task}
                        </Text>
                    )}
                </View>

                <Spacer />

                {ministry && (
                    <>
                        <AddButton
                            handleAddEvent={() => handleTouchMail(ministry)}
                            buttonLabel="Contact Ministry Leader"
                            disabled={loading}
                        />
                        {userCanEdit && (
                            <>
                                <AddButton
                                    handleAddEvent={() =>
                                        handleCreateMinistry()
                                    }
                                    buttonLabel="Save Changes"
                                    disabled={loading}
                                />
                                <AddButton
                                    handleAddEvent={() =>
                                        handleDeleteItem(ministry)
                                    }
                                    buttonLabel="Delete Ministry"
                                    disabled={loading}
                                />
                            </>
                        )}
                    </>
                )}
                {!ministry && userCanEdit && (
                    <>
                        <AddButton
                            handleAddEvent={() => handleCreateMinistry()}
                            buttonLabel="Create Ministry"
                            disabled={loading}
                        />
                        <Text style={textStyle}>
                            *As icon, please enter the name of a FontAwesome
                            icon.
                        </Text>
                        <Text style={textStyle}>
                            Possible icons include: "users", "child", "book",
                            "music", "heart", "home", "cogs", "paint-brush",
                            "dumbbell", "globe", "leaf", "paw", "camera",
                            "gamepad", "laptop-code", "file", and many more.
                        </Text>
                        <Spacer />
                        <Spacer />
                    </>
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

export default NewEditMinistry;
