import { Timestamp } from '@react-native-firebase/firestore';

export interface IEvent {
    title: string;
    date: Timestamp;
    text: string;
    location: string;
    details: string;
    contact?: string;
}
