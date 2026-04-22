import FontAwesome from '@react-native-vector-icons/fontawesome';
import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    Platform,
    ScrollView,
} from 'react-native';
import { Timestamp } from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Separator from '../../../../functions/Separator';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';
import resourcesStorage from '../../../../storage/resourcesStorage';
import userSettings from '../../../../storage/userSettings';
import { IPassage } from '../../../../interfaces/IPassage';
import hasUserRole from '../../../../functions/hasUserRole';
import { userGroups } from '../../../../constants/userGroups';
import addItemToDatabase from '../../../../functions/database/addItemToDatabase';
import deleteItem from '../../../../functions/database/deleteItem';
import Spacer from '../../../../components/Spacer';
import AddButton from '../../../../components/AddButton';

function Passages() {
    const { passages, setPassages } = resourcesStorage();
    const { user } = userSettings();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passageText, setPassageText] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const handleDateChange = (event: any, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleDeletePassage = async (passage: IPassage) => {
        Alert.alert(
            'Delete Passage',
            `Are you sure you want to delete "${passage.passage}"?`,
            [
                { text: 'Cancel', onPress: () => {} },
                {
                    text: 'Delete',
                    onPress: async () => {
                        const result = await deleteItem(passage, 'passages');
                        if (result === 'success') {
                            setPassages(
                                passages.filter(p => p.id !== passage.id),
                            );
                        } else {
                            Alert.alert('Error', 'Could not delete passage');
                        }
                    },
                    style: 'destructive',
                },
            ],
        );
    };

    const handleAddPassage = async () => {
        if (!passageText.trim()) {
            Alert.alert('Missing Field', 'Please enter a passage.');
            return;
        }

        setIsLoading(true);
        const newPassage: Omit<IPassage, 'id'> = {
            passage: passageText,
            date: Timestamp.fromDate(selectedDate),
        };

        const result = await addItemToDatabase(newPassage, 'passages');
        setIsLoading(false);

        if (result.status === 'success' && result.id) {
            setPassages([...passages, { ...newPassage, id: result.id }]);
            setPassageText('');
            setSelectedDate(new Date());
            setIsModalVisible(false);
        } else {
            Alert.alert('Error', result.message || 'Could not add passage');
        }
    };

    const renderItem = ({ item }: { item: IPassage }) => {
        const formattedDate = item.date.toDate().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        const titleStyle = generateStyle('fontM', 'weight600', 'primary');
        const dateStyle = generateStyle('fontS');

        return (
            <View style={styles.card}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name="book"
                            size={22}
                            color={colorMap.secondary}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={titleStyle}>{item.passage}</Text>
                        <View style={styles.customSpacer} />
                        <Text style={dateStyle}>{formattedDate}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleDeletePassage(item)}>
                    <FontAwesome
                        name="trash-o"
                        size={20}
                        color={colorMap.third}
                        style={styles.chevron}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const viewStyle = generateStyle('hMinMax');
    const flatListStyle = generateStyle('hPadding3XL', 'wPadding3XL');

    return (
        <View style={viewStyle}>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View
                        style={{
                            ...styles.modalContent,
                            backgroundColor: colorMap.bgColor,
                        }}
                    >
                        <View style={styles.modalHeader}>
                            <Text
                                style={{
                                    ...generateStyle('fontL', 'weight600'),
                                    color: colorMap.secondary,
                                }}
                            >
                                Add Passage
                            </Text>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                            >
                                <FontAwesome
                                    name="close"
                                    size={24}
                                    color={colorMap.secondary}
                                />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={{
                                ...styles.textInput,
                                borderWidth: 3,
                                borderColor: colorMap.lightGray,
                                backgroundColor: colorMap.bgColor,
                                color: colorMap.third,
                            }}
                            placeholder="Enter passage (e.g., John 3:16)"
                            placeholderTextColor={colorMap.third}
                            value={passageText}
                            onChangeText={setPassageText}
                            editable={!isLoading}
                        />

                        <Spacer />

                        <Text
                            style={{
                                ...generateStyle('fontM', 'weight600'),
                                color: colorMap.secondary,
                                marginBottom: 8,
                            }}
                        >
                            Date
                        </Text>

                        <TouchableOpacity
                            style={{
                                ...styles.dateButton,
                                backgroundColor: colorMap.bgColor,
                                borderWidth: 3,
                                borderColor: colorMap.lightGray,
                            }}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text
                                style={{
                                    color: colorMap.third,
                                    fontSize: 16,
                                }}
                            >
                                {selectedDate.toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display={
                                    Platform.OS === 'ios'
                                        ? 'spinner'
                                        : 'default'
                                }
                                onChange={handleDateChange}
                            />
                        )}

                        {Platform.OS === 'ios' && showDatePicker && (
                            <TouchableOpacity
                                style={{
                                    ...styles.dateConfirmButton,
                                    backgroundColor: colorMap.secondary,
                                }}
                                onPress={() => setShowDatePicker(false)}
                            >
                                <Text
                                    style={{
                                        ...generateStyle(
                                            'fontM',
                                            'weight600',
                                            'bgTransparent',
                                        ),
                                    }}
                                >
                                    Done
                                </Text>
                            </TouchableOpacity>
                        )}

                        <Spacer />

                        <TouchableOpacity
                            style={{
                                ...styles.submitButton,
                                backgroundColor: colorMap.secondary,
                                opacity: isLoading ? 0.6 : 1,
                            }}
                            onPress={handleAddPassage}
                            disabled={isLoading}
                        >
                            <Text
                                style={{
                                    ...generateStyle(
                                        'fontM',
                                        'weight600',
                                        'bgTransparent',
                                    ),
                                }}
                            >
                                {isLoading ? 'Adding...' : 'Add Passage'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <FlatList
                    data={passages}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={flatListStyle}
                    ItemSeparatorComponent={Separator}
                    scrollEnabled={false}
                />

                {hasUserRole(user, [userGroups.ADMIN]) && (
                    <AddButton
                        handleAddEvent={() => setIsModalVisible(true)}
                        buttonLabel="Add Passage"
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    customSpacer: { marginTop: 6 },
    chevron: {
        marginLeft: 10,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    textInput: {
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    dateButton: {
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'center',
        marginBottom: 8,
    },
    dateConfirmButton: {
        borderRadius: 10,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    submitButton: {
        borderRadius: 10,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Passages;
