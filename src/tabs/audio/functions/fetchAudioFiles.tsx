import { Track } from 'react-native-track-player';
import fetchFileFromStorage from '../../../functions/database/fetchFileFromStorage';
import getCollectionData from '../../../functions/getCollectionData';
import { IAudioFileFB } from '../interfaces/IAudioFile';

async function fetchAudioFiles(): Promise<Track[] | null> {
    return getCollectionData<IAudioFileFB>('audios')
        .then(audios => {
            if (audios) {
                const promises = audios.map(audio =>
                    fetchFileFromStorage(audio.file),
                );
                return Promise.all(promises)
                    .then(urls => {
                        const tracks: Track[] = audios.map((audio, num) => ({
                            url: urls[num] ?? '',
                            title: audio.title,
                            duration: audio.audio_duration,
                            artist: audio.artist,
                            album: audio.album,
                            subtitle: audio.subtitle,
                        }));
                        return tracks;
                    })
                    .catch(() => null);
            }
            return null;
        })
        .catch(() => null);
}

export default fetchAudioFiles;
