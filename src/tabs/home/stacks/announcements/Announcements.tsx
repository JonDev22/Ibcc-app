import FontAwesome from '@react-native-vector-icons/fontawesome';
import React, { use } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { IAnnouncement } from '../../../../interfaces/IAnnouncement';
import Separator from '../../../../functions/Separator';
import { colors } from '../../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../types/homeNavigationProp';
import { ResourceContext } from '../../../../contexts/ResourceContext';

function Announcements() {
    const navigation =
        useNavigation<HomeNavigationType<'Announcements Details'>>();

    const { announcements } = use(ResourceContext);

    const renderItem = ({ item }: { item: IAnnouncement }) => {
        const formattedDate = item.date.toDate().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

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
                            color={colors.lightPetrolBlue}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.disclaimer}>{item.disclaimer}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
                <FontAwesome
                    name="chevron-right"
                    size={20}
                    color={colors.petrolBlue}
                    style={styles.chevron}
                />
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={announcements}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={Separator}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
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
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.petrolBlue,
    },
    date: {
        fontSize: 13,
        marginTop: 4,
    },
    disclaimer: {
        fontSize: 14,
        color: colors.lightPetrolBlue,
        marginTop: 6,
    },
    chevron: {
        marginLeft: 10,
    },
});

export default Announcements;
