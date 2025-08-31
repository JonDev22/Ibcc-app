import { Timestamp } from '@react-native-firebase/firestore';

export interface IAnnouncement {
    id: string;
    title: string;
    disclaimer: string;
    detail: string;
    contact: string;
    date: Timestamp;
}
