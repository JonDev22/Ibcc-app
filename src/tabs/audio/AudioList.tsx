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
import useStyle from '../../hooks/useStyle';

interface IPlayerTrack extends Track {
    index: number;
}

type Props = {
    songs: Track[];
    onPressSong: (songId: number) => void;
};

export default function SongList({ songs, onPressSong }: Props) {
    const generateStyle = useStyle();

    const containerStyle = generateStyle();
    const listStyle = generateStyle('wPadding3XL');
    const touchableStyle = generateStyle(
        'hPadding4XL',
        'wPadding2XL',
        'flexRow',
        'itemsCenter',
        'justifyBetween',
    );
    const headerStyle = generateStyle(
        'justifyContentCenter',
        'font2XL',
        'bold',
        'itemsCenter',
        'hPadding2XL',
        'wPadding2XL',
        'primary',
    );
    const titleStyle = generateStyle('fontS', 'weight600', 'primary');
    const subtitleStyle = generateStyle('wMarginS', 'secondary');
    const durationStyle = generateStyle('fontXS', 'third', 'weight500');

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
            style={touchableStyle}
            onPress={() => onPressSong(item.index)}
        >
            <View style={styles.textContainer}>
                <Text style={titleStyle}>{item.title}</Text>
                <Text style={subtitleStyle}>
                    {item.artist} {item.album ? `• ${item.album}` : ''}
                </Text>
            </View>
            <Text style={durationStyle}>
                {formatDurationTime(item.duration ?? 0)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            {Object.entries(categorized).map(([album, list]) => (
                <View key={album} style={containerStyle}>
                    <Text style={headerStyle}>{album}</Text>
                    <FlatList
                        data={list}
                        keyExtractor={item => item.title ?? item.url}
                        renderItem={renderItem}
                        contentContainerStyle={listStyle}
                        ItemSeparatorComponent={Separator}
                        scrollEnabled={false}
                    />
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        flexShrink: 1,
    },
});
