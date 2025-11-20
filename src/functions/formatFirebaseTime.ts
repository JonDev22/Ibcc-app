import { Timestamp } from '@react-native-firebase/firestore';

function formatFirebaseTime(timestamp: Timestamp): string {
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Berlin', // Ignoring potential time zone offsets.
    }).format(timestamp.toDate());
}

export default formatFirebaseTime;
