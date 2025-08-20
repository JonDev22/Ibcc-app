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

type Props = {
    songs: Track[];
    onPressSong: (songId: number) => void;
};

const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function SongList({ songs, onPressSong }: Props) {
    const separatorView = () => <View style={styles.separator} />;

    const renderItem = ({ item, index }: { item: Track; index: number }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onPressSong(index)}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>
                    {item.artist} {item.album ? `• ${item.album}` : ''}
                </Text>
            </View>
            <Text style={styles.duration}>
                {formatDuration(item.duration ?? 0)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={songs}
            keyExtractor={item => item.title ?? item.url}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => separatorView()}
        />
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
        backgroundColor: colors.white100,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
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
    separator: {
        height: 12,
    },
});
