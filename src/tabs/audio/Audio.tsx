import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TrackPlayer, {
    useProgress,
    usePlaybackState,
    State,
    Track,
} from 'react-native-track-player';
import fetchAudioFiles from './functions/fetchAudioFiles';
import AudioList from './AudioList';
import AudioPlayer from './AudioPlayer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';

function Audio() {
    // State and progress from player package.
    const playBackState = usePlaybackState();
    const progress = useProgress();

    // Stores current tracks.
    const [currentTrack, setCurrentTrack] = useState<Track | undefined>();
    const [track, setTrack] = useState<Track[]>();

    const togglePlayPause = () => {
        playBackState.state === State.Playing
            ? TrackPlayer.pause()
            : TrackPlayer.play();
    };

    const setCurrentTrackFromPlayer = useCallback(() => {
        TrackPlayer.getActiveTrackIndex().then(index => {
            if (track && index !== undefined) {
                setCurrentTrack(track[index]);
            }
        });
    }, [track]);

    const next = async () => {
        await TrackPlayer.skipToNext();
        setCurrentTrackFromPlayer();
    };

    const prev = async () => {
        await TrackPlayer.skipToPrevious();
        setCurrentTrackFromPlayer();
    };

    const pick = async (id: number) => {
        await TrackPlayer.skip(id);

        if (playBackState.state !== State.Playing) {
            await TrackPlayer.play();
        }
        setCurrentTrackFromPlayer();
    };

    useEffect(() => {
        setCurrentTrackFromPlayer();
    }, [track, setCurrentTrackFromPlayer]);

    useEffect(() => {
        const setup = async () => {
            await TrackPlayer.setupPlayer();
            fetchAudioFiles().then(async res => {
                if (res) {
                    await TrackPlayer.add(res);
                    setTrack(res);
                }
            });
        };

        setup();

        return () => {};
    }, [setCurrentTrackFromPlayer]);

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                {track ? (
                    <AudioList songs={track} onPressSong={pick} />
                ) : (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}
            </View>

            <View style={styles.fixedContainer}>
                <AudioPlayer
                    title={currentTrack?.title || 'No Track Playing'}
                    artist={currentTrack?.artist || 'Unknown Artist'}
                    isPlaying={playBackState.state === State.Playing}
                    onPlay={togglePlayPause}
                    onPrev={prev}
                    onNext={next}
                    position={progress.position}
                    duration={progress.duration}
                />
            </View>
        </View>
    );
}

const Stack = createNativeStackNavigator();

function AudioStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.lightPetrolBlue,
                },
                headerTintColor: 'orange',
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="Audio Player" component={Audio} />
        </Stack.Navigator>
    );
}

export default AudioStack;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
    },
    listContainer: {
        width: '100%',
    },
    title: { fontSize: 24, textAlign: 'center' },
    fixedContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    loadingText: {
        alignSelf: 'center',
        fontSize: 18,
        color: colors.petrolBlue,
        marginTop: 20,
        fontWeight: '600',
    },
});
