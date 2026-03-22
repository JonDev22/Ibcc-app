import TrackPlayer from 'react-native-track-player';
import fetchFileFromStorage from './database/fetchFileFromStorage';

const getAudioDuration = async (storagePath: string): Promise<number> => {
    try {
        const fileUrl = await fetchFileFromStorage(storagePath);

        if (!fileUrl) {
            console.error('Failed to fetch file URL from storage');
            return -1;
        }

        await TrackPlayer.add({
            url: fileUrl,
            title: 'Audio',
        });

        const progress = await TrackPlayer.getProgress();
        await TrackPlayer.reset();
        return Math.round(progress.duration);
    } catch (error) {
        console.error('Error getting audio duration:', error);
        return -1;
    }
};

export default getAudioDuration;
