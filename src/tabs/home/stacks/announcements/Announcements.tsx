import FontAwesome from '@react-native-vector-icons/fontawesome';
import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { IAnnouncement } from '../../../../interfaces/IAnnouncement';
import Separator from '../../../../functions/Separator';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../types/homeNavigationProp';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';
import resourcesStorage from '../../../../storage/resourcesStorage';
import userSettings from '../../../../storage/userSettings';

function Announcements() {
    const navigation =
        useNavigation<HomeNavigationType<'Announcements Details'>>();

    const { announcements } = resourcesStorage();
    const { user } = userSettings();

    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const renderItem = ({ item }: { item: IAnnouncement }) => {
        const formattedDate = item.date.toDate().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        const titleStyle = generateStyle('fontM', 'weight600', 'primary');
        const disclaimerStyle = generateStyle('secondary', 'fontS');
        const dateStyle = generateStyle('fontS');

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate('Announcements Details', {
                        announcement: item,
                    })
                }
            >
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name="info-circle"
                            size={22}
                            color={colorMap.secondary}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={titleStyle}>{item.title}</Text>
                        <View style={styles.customSpacer} />
                        <Text style={disclaimerStyle}>{item.disclaimer}</Text>
                        <View style={styles.customSpacer} />
                        <Text style={dateStyle}>{formattedDate}</Text>
                    </View>
                </View>
                <FontAwesome
                    name="chevron-right"
                    size={20}
                    color={colorMap.primary}
                    style={styles.chevron}
                />
            </TouchableOpacity>
        );
    };

    const viewStyle = generateStyle('hMinMax');
    const flatListStyle = generateStyle('hPadding3XL', 'wPadding3XL');

    const handleAddAnnouncement = () => {
        navigation.navigate('New Announcement');
    };

    return (
        <View style={viewStyle}>
            <FlatList
                data={announcements}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={flatListStyle}
                ItemSeparatorComponent={Separator}
            />

            {user && (
                <TouchableOpacity
                    style={{
                        ...styles.fab,
                        backgroundColor: colorMap.secondary,
                    }}
                    onPress={handleAddAnnouncement}
                >
                    <Text style={{ color: colorMap.color }}>+</Text>
                </TouchableOpacity>
            )}
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
});

export default Announcements;
