import { Timestamp } from '@react-native-firebase/firestore';

function formatFirebaseDate(timestamp: Timestamp): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(timestamp.toDate());
}

export default formatFirebaseDate;
