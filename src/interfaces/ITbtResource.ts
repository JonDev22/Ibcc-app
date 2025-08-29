import { Timestamp } from '@react-native-firebase/firestore';

export interface ITbtResource {
    id: string;
    resourceType: string;
    text: string;
    resource: string;
    title: string;
    date: Timestamp;
}
