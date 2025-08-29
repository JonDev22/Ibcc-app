import { Timestamp } from '@react-native-firebase/firestore';

export interface IEvent {
    id: string;
    title: string;
    date: Timestamp;
    text: string;
    location: string;
    details?: string;
    contact?: string;
}
