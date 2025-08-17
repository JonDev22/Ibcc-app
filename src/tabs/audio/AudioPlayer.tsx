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
};

export default function MiniPlayer({
    title,
    artist,
    isPlaying,
    onPlay,
    onNext,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                    {artist}
                </Text>
            </View>

            <View style={styles.controls}>
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
        backgroundColor: colors.orange,
        padding: 10,
        borderRadius: 25,
        marginLeft: 8,
    },
});
