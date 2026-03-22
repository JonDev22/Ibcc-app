import { Platform } from 'react-native';

// Define a map for common types
const TYPE_MAP: Record<string, { ios: string; android: string }> = {
    pdf: { ios: 'com.adobe.pdf', android: 'application/pdf' },
    mp3: { ios: 'public.mp3', android: 'audio/mpeg' },
    wav: { ios: 'com.microsoft.waveform-audio', android: 'audio/wav' },
    aac: { ios: 'public.audio', android: 'audio/aac' },
    m4a: { ios: 'com.apple.m4a-audio', android: 'audio/mp4' },
    png: { ios: 'public.png', android: 'image/png' },
};

const getPlatformSpecificType = (dataTypes: string[] = ['pdf']) => {
    const pickerTypes = dataTypes.map(type => {
        const lowerType = type.toLowerCase();
        const mapping = TYPE_MAP[lowerType];
        if (mapping) {
            return Platform.OS === 'ios' ? mapping.ios : mapping.android;
        }
        // If no mapping found, return the original type (assuming it's a valid MIME type or UTI)
        return Platform.OS === 'ios'
            ? `public.${lowerType}`
            : `application/${lowerType}`;
    });

    // iOS uses UTIs, Android uses MIME types
    return { type: pickerTypes };
};

export default getPlatformSpecificType;
