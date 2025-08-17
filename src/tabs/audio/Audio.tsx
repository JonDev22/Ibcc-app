import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, {
    useProgress,
    usePlaybackState,
    State,
    Track,
} from 'react-native-track-player';
import { SafeAreaView } from 'react-native-safe-area-context';
import fetchAudioFiles from './functions/fetchAudioFiles';
import AudioList from './AudioList';
import AudioPlayer from './AudioPlayer';

function Audio() {
    // State and progress from player package.
    const playBackState = usePlaybackState();
    const progress = useProgress();

    // Stores current tracks.
    const [currentTrack, setCurrentTrack] = useState();
    const [track, setTrack] = useState<Track[]>();

    // Use effect to fetch items once user navigates to component for first time.
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
    }, []);

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

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {track && <AudioList songs={track} onPressSong={pick} />}

                <AudioPlayer
                    title="A"
                    artist="B"
                    isPlaying={false}
                    onPlay={togglePlayPause}
                    onNext={next}
                />

                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {new Date(
                            progress.position * 1000,
                        ).toLocaleTimeString()}
                    </Text>
                    <Text style={styles.timeText}>
                        {new Date(
                            (progress.duration || 0) * 1000,
                        ).toLocaleTimeString()}
                    </Text>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={prev}>
                        <Text style={styles.controlText}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlayPause}>
                        <Text style={styles.controlText}>
                            {playBackState.state === State.Playing
                                ? 'Pause'
                                : 'Play'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={next}>
                        <Text style={styles.controlText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Audio;

const styles = StyleSheet.create({
    container: { flex: 0, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, textAlign: 'center' },
    artist: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    slider: { width: '100%', height: 40 },
    timeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    timeText: { fontSize: 14, color: '#333' },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    controlText: { fontSize: 18, color: '#1FB28A' },
});
