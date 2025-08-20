// MiniPlayer.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
import { colors } from '../../theme/colors';

type Props = {
    title: string;
    artist: string;
    isPlaying: boolean;
    onPlay: () => void;
    onNext: () => void;
    onPrev: () => void;
    position: number;
    duration: number;
};

export default function MiniPlayer({
    title,
    artist,
    isPlaying,
    onPlay,
    onNext,
    onPrev,
    position,
    duration,
}: Props) {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor((time % 60) * 100) / 100;
        return `${minutes}:${seconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                    {artist}, {formatTime(position)}, {formatTime(duration)}
                </Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={onPrev} style={styles.button}>
                    <Icon name="backward" size={20} color={colors.white100} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onPlay} style={styles.button}>
                    <Icon
                        name={isPlaying ? 'pause' : 'play'}
                        size={22}
                        color={colors.white100}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onNext} style={styles.button}>
                    <Icon name="forward" size={20} color={colors.white100} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.petrolBlue,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        marginRight: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white100,
    },
    artist: {
        fontSize: 14,
        color: colors.lightSteelBlue,
    },
    controls: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
    },
});
