import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TrackPlayer, {
    useProgress,
    usePlaybackState,
    State,
    Track,
    useActiveTrack,
} from 'react-native-track-player';
import fetchAudioFiles from './functions/fetchAudioFiles';
import AudioList from './AudioList';
import AudioPlayer from './AudioPlayer';
import { colors } from '../../theme/colors';

function Audio() {
    // State and progress from player package.
    const playBackState = usePlaybackState();
    const progress = useProgress();
    const activeTrack = useActiveTrack();

    // Stores current tracks.
    const [track, setTrack] = useState<Track[]>();

    const togglePlayPause = () => {
        playBackState.state === State.Playing
            ? TrackPlayer.pause()
            : TrackPlayer.play();
    };

    const next = async () => {
        await TrackPlayer.skipToNext();
    };

    const prev = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const pick = async (id: number) => {
        await TrackPlayer.skip(id);

        if (playBackState.state !== State.Playing) {
            await TrackPlayer.play();
        }
    };

    useEffect(() => {
        const setup = async () => {
            await TrackPlayer.setupPlayer();
            fetchAudioFiles().then(async res => {
                if (res) {
                    const sortedRes = res.sort((a, b) => {
                        const albumA = a.album ?? '';
                        const albumB = b.album ?? '';
                        return albumA.localeCompare(albumB);
                    });
                    await TrackPlayer.add(sortedRes);
                    setTrack(sortedRes);
                }
            });
        };

        setup();

        return () => {};
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.listContainer}>
                {track ? (
                    <AudioList songs={track} onPressSong={pick} />
                ) : (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}
            </ScrollView>

            {/* <View style={styles.fixedContainer}> */}
            <AudioPlayer
                title={activeTrack?.title || 'No Track Playing'}
                artist={activeTrack?.artist || 'Unknown Artist'}
                isPlaying={playBackState.state === State.Playing}
                onPlay={togglePlayPause}
                onPrev={prev}
                onNext={next}
                position={progress.position}
                duration={progress.duration}
            />
            {/* </View> */}
        </View>
    );
}

export default Audio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    listContainer: {
        flex: 1,
    },
    title: { fontSize: 24, textAlign: 'center' },
    fixedContainer: {
        minHeight: 100,
    },
    loadingText: {
        alignSelf: 'center',
        fontSize: 18,
        color: colors.petrolBlue,
        marginTop: 20,
        fontWeight: '600',
    },
});
