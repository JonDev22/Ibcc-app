import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Track } from 'react-native-track-player';
import Separator from '../../functions/Separator';
import formatDurationTime from './functions/formatDurationTime';

interface IPlayerTrack extends Track {
    index: number;
}

type Props = {
    songs: Track[];
    onPressSong: (songId: number) => void;
};

export default function SongList({ songs, onPressSong }: Props) {
    const categorized = songs.reduce<Record<string, IPlayerTrack[]>>(
        (acc, track, num) => {
            const key = track.album ?? 'Other';
            if (!acc[key]) acc[key] = [];
            acc[key].push({ ...track, index: num });
            return acc;
        },
        {},
    );

    const renderItem = ({ item }: { item: IPlayerTrack }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onPressSong(item.index)}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>
                    {item.artist} {item.subtitle ? `• ${item.subtitle}` : ''}
                </Text>
            </View>
            <Text style={styles.duration}>
                {formatDurationTime(item.duration ?? 0)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            {Object.entries(categorized).map(([album, list]) => (
                <View key={album}>
                    <Text style={styles.header}>{album}</Text>
                    <FlatList
                        data={list}
                        keyExtractor={item => item.title ?? item.url}
                        renderItem={renderItem}
                        contentContainerStyle={styles.list}
                        ItemSeparatorComponent={Separator}
                        scrollEnabled={false}
                    />
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 12,
        backgroundColor: colors.white50,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    textContainer: {
        flexShrink: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.petrolBlue,
    },
    subtitle: {
        fontSize: 14,
        color: colors.slateBlue,
        marginTop: 2,
    },
    duration: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.orange,
        marginLeft: 8,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.petrolBlue,
    },
});
