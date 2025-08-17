export interface IAudioFileFB {
    title: string;
    subtitle: string;
    number: number;
    file: string;
    audio_duration: number;
    artist: string;
    album: string;
}

export interface IAudioFile extends IAudioFileFB {
    url: string;
}
